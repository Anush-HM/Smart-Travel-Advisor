const express = require("express");
const router = express.Router();

router.post("/analyze", async (req, res) => {
  const { image } = req.body;
  
  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [{
          role: "user",
          content: [
            { 
              type: "text", 
              text: "You are a travel assistant. Identify this travel destination and ask what they'd like to know about it." 
            },
            { 
              type: "image_url", 
              image_url: { url: `data:image/jpeg;base64,${image}` } 
            }
          ]
        }],
        max_tokens: 500
      })
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });
    
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
});

module.exports = router;