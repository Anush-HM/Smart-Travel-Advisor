const getWeather = async (req, res) => {
  try {
    const city = req.query.city;
    const apiKey = process.env.WEATHER_API_KEY;

    // Current weather
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const currentResponse = await fetch(currentUrl);
    const currentData = await currentResponse.json();

    if (currentData.cod != 200) {
      return res.status(400).json({ error: currentData.message });
    }

    // 5-day forecast
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    const daily = {};
    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      if (!daily[date]) {
        daily[date] = {
          date: date,
          temp: item.main.temp,
          condition: item.weather[0].description
        };
      }
    });

    const forecast = Object.values(daily).slice(0, 5);

    // ✅ ADDED: average temp and most common condition
    const avgTemp = Math.round(forecast.reduce((sum, d) => sum + d.temp, 0) / forecast.length);
    const conditionCount = {};
    forecast.forEach(d => {
      conditionCount[d.condition] = (conditionCount[d.condition] || 0) + 1;
    });
    const avgCondition = Object.keys(conditionCount).reduce((a, b) =>
      conditionCount[a] > conditionCount[b] ? a : b
    );

    res.json({
      city: currentData.name,
      temperature: currentData.main.temp,
      condition: currentData.weather[0].description,
      humidity: currentData.main.humidity,
      wind: currentData.wind.speed,
      forecast: forecast,
      avgTemp: avgTemp,           // ✅ added
      avgCondition: avgCondition  // ✅ added
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch weather" });
  }
};

module.exports = { getWeather };