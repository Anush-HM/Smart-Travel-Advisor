async function loadSafetyInfo(city, temp, condition) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/ai?type=safety&city=${city}&temp=${temp}&condition=${condition}`
    );
    const data = await response.json();
const lines = data.result.split("\n").filter(line => line.trim() !== "");
lines.shift();
const text = lines.join("\n");
    document.getElementById("safetyTips").innerHTML = data.result
  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  .replace(/\n/g, "<br>");
  } catch (error) {
    document.getElementById("safetyTips").innerHTML = "<p style='color:red;'>Unable to fetch safety tips</p>";
  }
}