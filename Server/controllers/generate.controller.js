import Notes from "../models/notes.model.js";
import User from "../models/user.model.js";
import { generateGeminiResponses } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
  console.log("🔥 generateNotes route hit");
  console.log("REQ.USERID:", req.userId);

  try {
    const {
      topic,
      classLevel,
      examType,
      revisionMode = false,
      includeDiagram = false,
      includeChart = false,
    } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Topic is Required" });
    }

    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(400).json({ message: "User Not Found" });
    }

    if (user.credits < 10) {
      user.isCreditAvailaible = false;
      await user.save();
      return res.status(403).json({
        message: "Insufficient Credits",
        creditsLeft: user.credits,
      });
    }

    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    let aiResponse;
    try {
      aiResponse = await generateGeminiResponses(prompt);
    } catch (error) {
      return res.status(error.status || 502).json({
        message: error.message || "AI service failed to generate response.",
      });
    }

    console.log("AI RESPONSE:", aiResponse);
    console.log("TYPE:", typeof aiResponse);

    const notes = await Notes.create({
      user: user._id,
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
      content: aiResponse,
    });

    user.credits -= 10;

    if (user.credits <= 0) {
      user.isCreditAvailaible = false;
    }

    if (!Array.isArray(user.notes)) {
      user.notes = [];
    }

    user.notes.push(notes._id);
    await user.save();

    return res.status(200).json({
      data: aiResponse,
      noteId: notes._id,
      creditsLeft: user.credits,
    });
  } catch (error) {
    console.error("🔥 FULL ERROR:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
