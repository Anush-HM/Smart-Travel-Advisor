async function loadPackingInfo(city, temp, condition) {
  try {
    const response = await fetch(
      `http://127.0.0.1:5000/api/ai?type=packing&city=${city}&temp=${temp}&condition=${condition}`
    );
    const data = await response.json();
    document.getElementById("packingTips").innerHTML = data.result
  .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
  .replace(/\n/g, "<br>");
  } catch (error) {
    document.getElementById("packingTips").innerHTML = "<p style='color:red;'>Unable to fetch packing tips</p>";
  }
}