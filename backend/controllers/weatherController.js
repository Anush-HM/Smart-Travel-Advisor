const getWeather = async (req, res) => {
  try {
    const city = req.query.city;

    const apiKey = process.env.WEATHER_API_KEY;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod != 200) {
      return res.status(400).json({ error: data.message });
    }

    res.json({
      city: data.name,
      temperature: data.main.temp,
      condition: data.weather[0].description,
      humidity: data.main.humidity,
      wind: data.wind.speed
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather" });
  }

};

module.exports = { getWeather };
