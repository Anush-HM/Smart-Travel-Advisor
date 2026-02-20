function loadSafetyInfo(destination) {
  const safetyTips = [
    "Avoid isolated areas at night",
    "Keep emergency contacts saved",
    "Be alert in crowded places"
  ];

  const emergencyTips = [
    "🔥 Heat: Stay hydrated",
    "❄ Cold: Wear layered clothing",
    "🏔 Altitude: Rest and hydrate"
  ];

  document.getElementById("safetyTips").innerHTML =
    safetyTips.map(tip => `<li>${tip}</li>`).join("");

  document.getElementById("emergencyTips").innerHTML =
    emergencyTips.map(tip => `<li>${tip}</li>`).join("");
}
