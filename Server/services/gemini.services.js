const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const generateGeminiResponses = async (prompt) => {
  try {
    console.log("🔥 BEFORE FETCH");
    const response = await fetch(
      `${GEMINI_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      },
    );

    console.log("🔥 AFTER FETCH");
    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API HTTP Error:", errText);
      return "AI service failed to generate response.";
    }

    const data = await response.json(); // ✅ FIXED

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Gemini returned empty response:", data);
      return "AI service returned no content.";
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Try parsing JSON safely
    try {
      return JSON.parse(cleanText);
    } catch {
      // If it's not valid JSON, return raw text instead of crashing
      return cleanText;
    }
  } catch (error) {
    console.error("Gemini Service Fatal Error:", error.message);

    // DO NOT THROW
    return "AI service is temporarily unavailable.";
  }
};
