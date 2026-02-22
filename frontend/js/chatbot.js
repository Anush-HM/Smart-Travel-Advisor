// Get city from URL
const city = new URLSearchParams(window.location.search).get("place")?.split(":")[0].trim() || "your destination";

// Main send function
async function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const message = chatInput.value.trim();
  if (message === "") return;

  addUserMessage(message);
  chatInput.value = "";

  try {
    const response = await fetch("http://127.0.0.1:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, city })
    });
    const data = await response.json();
    addBotMessage(data.reply);
  } catch (error) {
    addBotMessage("Sorry, I couldn't connect to the server.");
  }
}

// Handle image upload
function sendImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    const chatBox = document.getElementById("chatBox");
    const img = document.createElement("img");
    img.src = e.target.result;
    img.className = "self-end rounded-xl max-w-[200px] border border-white/20 mb-2";
    chatBox.appendChild(img);
    chatBox.scrollTop = chatBox.scrollHeight;

    setTimeout(() => {
      addBotMessage("🌍 I've received your image! Image analysis coming soon.");
    }, 600);
  };
  reader.readAsDataURL(file);
  input.value = "";
}

// Add user message
function addUserMessage(text) {
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.className = "self-end bg-teal-500/90 text-white px-4 py-2 rounded-xl max-w-[75%]";
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add bot message
function addBotMessage(text) {
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.className = "self-start bg-white/20 text-white px-4 py-2 rounded-xl max-w-[75%]";
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Initialize
window.addEventListener("load", function() {
  addBotMessage(`👋 Hey! I'm TripMate. Ready to explore ${city}? 🌍`);

 document.getElementById("backLink").onclick = function(e) {
  e.preventDefault();
  window.location.replace(`results.html?place=${city}`);
};

  const chatInput = document.getElementById("chatInput");
  chatInput.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});