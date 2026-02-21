const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const getAIContent = async (req, res) => {
  try {
    const { city, type, temp, condition } = req.query;

    let prompt = "";

    if (type === "safety") {
  prompt = `Give exactly 5 safety tips for a tourist in ${city} (${temp}°C, ${condition}). Respond ONLY with numbered list from 1 to 5. No intro.`;
} else if (type === "packing") {
  prompt = `Give exactly 5 packing suggestions as full sentences for a tourist in ${city} (${temp}°C, ${condition}). Respond ONLY with numbered list from 1 to 5. No intro.`;
} else if (type === "emergency") {
  prompt = `Give exactly 5 emergency tips for a tourist in ${city} (${temp}°C, ${condition}). Respond ONLY with numbered list from 1 to 5. No intro.`;
}

  const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    { 
      role: "system", 
      content: "You are a travel assistant. Always respond with only a numbered list. Never write any intro or outro sentences. Start directly with 1." 
    },
    { role: "user", content: prompt }
  ]
});
const text = response.choices[0].message.content;
const lines = text.split("\n").filter(line => line.trim() !== "" && line.trim().match(/^\d/));
const cleaned = lines.slice(0, 5).join("\n");
res.json({ result: cleaned });

  } catch (error) {
  console.error("AI Error:", error.message);
  res.status(500).json({ error: error.message });
}
};

module.exports = { getAIContent };