const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const ChatHistory = require('../models/chathistory');

const chat = async (req, res) => {
  try {
    const { message, city } = req.body;

    const response = await groq.chat.completions.create({
  model: "llama-3.3-70b-versatile",
  messages: [
    {
      role: "system",
      content: `You are TripMate, a travel assistant STRICTLY for ${city} ONLY.
- The user is traveling to ${city}. Only discuss ${city}.
- If user asks about any landmark, place or attraction that is NOT located in ${city}, respond: "That is not located in ${city}. I can only help with ${city} travel information!"
- Before answering any question, verify if it is related to ${city} specifically
- NEVER discuss other cities or destinations
- Keep responses under 3 sentences`
    },
    { role: "user", content: message }
  ]
});

    const reply = response.choices[0].message.content;

     // Save chat to database
    try {
      await ChatHistory.create({
        destination: city,
        sessionId: 'anonymous',
        messages: [
          { sender: 'user', content: message },
          { sender: 'bot', content: reply }
        ]
      });
      console.log('✅ Chat saved to database');
    } catch (dbError) {
      console.error('⚠️ Failed to save chat:', dbError.message);
      // Don't fail the request if DB save fails
    }
    
    res.json({ reply });

  } catch (error) {
    console.error("Chat Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { chat };