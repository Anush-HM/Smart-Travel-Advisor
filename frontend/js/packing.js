function loadPackingList(destination) {
  const packingItems = [
    "Comfortable footwear",
    "Power bank",
    "Basic medicines",
    "Reusable water bottle",
    "Weather-appropriate clothing"
  ];

  document.getElementById("packingTips").innerHTML =
    packingItems.map(item => `<li>${item}</li>`).join("");
}
