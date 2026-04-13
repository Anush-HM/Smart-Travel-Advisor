const analyzeImage = async (req, res) => {
  const { image, city } = req.body;
  
  console.log("📸 Analyzing image for destination:", city);
  
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
              text: `You are a travel assistant helping plan a trip to ${city}.

IMPORTANT INSTRUCTIONS:
1. Analyze the image and identify what location it shows
2. Check if this location is in or related to ${city}
3. If YES (location is in ${city}):
   - Identify the specific place
   - Ask what they'd like to know (weather, safety, packing, etc.)
4. If NO (location is NOT in ${city}):
   - Politely say: "This appears to be [location name] in [actual city/country], not ${city}."
   - Suggest: "Since you're planning to visit ${city}, please upload an image related to ${city} attractions instead."

Be helpful but ensure the image matches their selected destination: ${city}.`
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
    
    if (data.error) {
      console.error('Groq API error:', data.error);
      return res.status(500).json({ error: data.error.message });
    }
    
    res.json({ result: data.choices[0].message.content });
    
  } catch (error) {
    console.error('Image analysis error:', error);
    res.status(500).json({ error: 'Failed to analyze image' });
  }
};

module.exports = { analyzeImage };