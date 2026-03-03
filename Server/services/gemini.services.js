const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

export const generateGeminiResponses = async (prompt) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      const missingKeyError = new Error("GEMINI_API_KEY is not configured.");
      missingKeyError.status = 500;
      throw missingKeyError;
    }

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

    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini API HTTP Error:", errText);

      let parsedErrorMessage = `Gemini API request failed with status ${response.status}`;
      try {
        const parsedError = JSON.parse(errText);
        parsedErrorMessage =
          parsedError?.error?.message ||
          parsedError?.message ||
          parsedErrorMessage;
      } catch {
        if (errText) {
          parsedErrorMessage = errText;
        }
      }

      const geminiError = new Error(parsedErrorMessage.trim());
      geminiError.status = response.status;
      throw geminiError;
    }

    const data = await response.json();

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Gemini returned empty response:", data);
      const emptyResponseError = new Error("Gemini returned no content.");
      emptyResponseError.status = 502;
      throw emptyResponseError;
    }

    const cleanText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    // Try parsing JSON safely
    try {
      return JSON.parse(cleanText);
    } catch {
      return cleanText;
    }
  } catch (error) {
    console.error("Gemini Service Fatal Error:", error.message);
    const serviceError = new Error(
      error?.message || "AI service failed to generate response.",
    );
    serviceError.status = error?.status || 502;
    throw serviceError;
  }
};
