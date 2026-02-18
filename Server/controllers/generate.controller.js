import Notes from "../models/notes.model.js";
import User from "../models/user.model.js";
import { generateGeminiResponses } from "../services/gemini.services.js";
import { buildPrompt } from "../utils/promptBuilder.js";

export const generateNotes = async (req, res) => {
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
      return res.status(403).json({ message: "Insufficient Credits" });
    }
    const prompt = buildPrompt({
      topic,
      classLevel,
      examType,
      revisionMode,
      includeDiagram,
      includeChart,
    });

    const aiResponse = generateGeminiResponses(prompt);

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
    user.notes.push(note._id);
    await user.save();
  } catch (error) {}
};
