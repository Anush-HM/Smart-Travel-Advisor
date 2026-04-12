const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const getLocalLingo = async (req, res) => {
  try {
    const { destination, sentence } = req.body;

    const prompt = `You are a local language expert. The user is traveling to "${destination}" and wants to say: "${sentence}"

Identify the most relevant local languages spoken in "${destination}" (max 4 languages — prioritize official + dominant regional languages).

Return ONLY a valid JSON object with NO extra text, NO markdown, NO backticks:

{
  "destination": "${destination}",
  "languages": [
    {
      "language": "Hindi",
      "code": "hi-IN",
      "nativeScript": "translated text in native script",
      "romanized": "how to pronounce it in english letters",
      "syllables": "na · mas · te",
      "stress": "stress on mas",
      "tip": "one short cultural tip about using this phrase here"
    }
  ]
}`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a language expert. Respond ONLY with valid raw JSON. No markdown, no backticks, no explanation."
        },
        { role: "user", content: prompt }
      ],
      max_tokens: 1500,
      temperature: 0.5
    });

    let text = response.choices[0].message.content.trim();
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const result = JSON.parse(text);
    res.json({ success: true, result });

  } catch (error) {
    console.error("Local Lingo error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { getLocalLingo };