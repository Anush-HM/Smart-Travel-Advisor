// ================== FETCH WEATHER FROM BACKEND ==================
function getWeather(city) {
  fetch(`http://localhost:5000/api/weather?city=${city}`)
    .then(response => response.json())
    .then(data => {
      console.log("Weather data:", data);
    })
    .catch(err => {
      console.error("Backend not running!", err);
    });
}

// ================== EXPLORE BUTTON LOGIC ==================
function goToResults() {
  const destinationInput = document.getElementById("destination");

  if (!destinationInput) {
    console.error("Destination input not found");
    return;
  }

  const destination = destinationInput.value.trim();

  if (destination === "") {
    alert("Please enter a destination");
    return;
  }


  // Redirect to results page
  window.location.href = `results.html?place=${encodeURIComponent(destination)}`;
}

// ================== CHATBOT TOGGLE ==================
function toggleChat() {
  const chatbot = document.getElementById("chatbot");
  if (chatbot) {
    chatbot.classList.toggle("hidden");
  }
}

// ================== CHATBOT MESSAGE ==================
function sendMessage() {
  const input = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");

  if (!input || !chatBox) return;

  if (input.value.trim() === "") return;

  chatBox.innerHTML += `
    <div><b>You:</b> ${input.value}</div>
    <div class="text-teal-400"><b>Bot:</b> I can help you plan your trip safely.</div>
  `;

  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;
}