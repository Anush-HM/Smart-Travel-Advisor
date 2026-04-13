async function loadEmergencyInfo(city, temp, condition) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/ai?type=emergency&city=${city}&temp=${temp}&condition=${condition}`
    );
    const data = await response.json();
    document.getElementById("emergencyTips").innerHTML = data.result
  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  .replace(/\n/g, "<br>");
  } catch (error) {
    document.getElementById("emergencyTips").innerHTML = "<p style='color:red;'>Unable to fetch emergency tips</p>";
  }
}