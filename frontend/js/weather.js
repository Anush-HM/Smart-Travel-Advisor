async function loadWeather(destination) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/weather?city=${destination}`
    );

    const weatherData = await response.json();

    document.getElementById("weatherInfo").innerHTML = `
      <p>🌡 Temperature: ${weatherData.temperature}</p>
      <p>☀ Condition: ${weatherData.condition}</p>
      <p>💧 Humidity: ${weatherData.humidity}</p>
      <p>🌬 Wind Speed: ${weatherData.wind}</p>
    `;
  } catch (error) {
    document.getElementById("weatherInfo").innerHTML =
      "<p>❌ Unable to fetch weather data</p>";
  }
}
