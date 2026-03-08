const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const planTrip = async (req, res) => {
  try {
    const { fromCity, toCity, days, budget, currency } = req.body;

    const prompt = `You are a professional travel planner. Create a complete trip plan for someone traveling from ${fromCity} to ${toCity} for ${days} days with a total budget of ${currency}${budget}.

Return ONLY a valid JSON object with NO extra text, NO markdown, NO backticks. Just raw JSON.

The JSON must follow this exact structure:
{
  "summary": "Brief 2-sentence trip overview",
  "totalEstimatedCost": "e.g. ₹85,000",
  "travelToDestination": {
    "mode": "Flight / Train / Bus",
    "duration": "e.g. 2.5 hours",
    "estimatedCost": "e.g. ₹8,000 - ₹15,000",
    "tips": "One booking tip"
  },
  "hotel": {
    "name": "Suggested hotel name fitting the budget",
    "type": "Budget / Mid-range / Luxury",
    "pricePerNight": "e.g. ₹2,500/night",
    "totalHotelCost": "e.g. ₹12,500 for 5 nights"
  },
  "days": [
    {
      "day": 1,
      "title": "Arrival & First Impressions",
      "morning": "Activity description",
      "afternoon": "Activity description",
      "evening": "Activity description",
      "estimatedDayCost": "e.g. ₹3,000",
      "places": ["Place Name 1", "Place Name 2"]
    }
  ],
  "returnTravel": {
    "mode": "Flight / Train / Bus",
    "duration": "e.g. 2.5 hours",
    "estimatedCost": "e.g. ₹8,000 - ₹15,000"
  },
  "budgetBreakdown": {
    "travel": "e.g. ₹20,000",
    "accommodation": "e.g. ₹12,500",
    "food": "e.g. ₹15,000",
    "attractions": "e.g. ₹10,000",
    "miscellaneous": "e.g. ₹5,000"
  },
  "allPlaces": ["Complete list of all unique place names mentioned across all days"]
}

Make it realistic, specific to ${toCity}, and fit within the ${currency}${budget} budget. Generate exactly ${days} day objects in the days array.`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are a travel planner. You ONLY respond with valid raw JSON. No markdown, no backticks, no explanation. Just the JSON object."
        },
        { role: "user", content: prompt }
      ],
      max_tokens: 4000,
      temperature: 0.7
    });

    let text = response.choices[0].message.content.trim();
    text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    const plan = JSON.parse(text);
    res.json({ success: true, plan });

  } catch (error) {
    console.error("Trip planner error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { planTrip };