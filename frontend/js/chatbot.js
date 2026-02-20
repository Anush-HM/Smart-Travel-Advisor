// Main send function
function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const message = chatInput.value.trim();

  if (message === "") return;

  console.log("Sending:", message);

  // Show user message
  addUserMessage(message);

  // Clear input
  chatInput.value = "";

  // Bot reply after delay
  setTimeout(() => {
    botReply(message);
  }, 700);
}

// ================= IMAGE UPLOAD PART (ADDED) =================

// Handle image upload
function sendImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    const chatBox = document.getElementById("chatBox");

    // Show uploaded image as user message
    const img = document.createElement("img");
    img.src = e.target.result;
    img.className =
      "self-end rounded-xl max-w-[200px] border border-white/20 mb-2";
    chatBox.appendChild(img);

    chatBox.scrollTop = chatBox.scrollHeight;

    // Default bot reply for image
    setTimeout(() => {
      addBotMessage(
        "🌍 I’ve got this destination—here are the key travel insights to help you plan confidently."
      );
    }, 600);
  };

  reader.readAsDataURL(file);
  input.value = "";
}

// ================= END IMAGE UPLOAD PART =================

// Add user message to chat
function addUserMessage(text) {
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.className =
    "self-end bg-teal-500/90 text-white px-4 py-2 rounded-xl max-w-[75%]";
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Add bot message to chat
function addBotMessage(text) {
  const chatBox = document.getElementById("chatBox");
  const msgDiv = document.createElement("div");
  msgDiv.className =
    "self-start bg-white/20 text-white px-4 py-2 rounded-xl max-w-[75%]";
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Simple bot logic
function botReply(userMsg) {
  let reply = "That sounds interesting! Tell me more ✨";
  const msg = userMsg.toLowerCase();

  if (msg.includes("weather")) {
    reply =
      "🌤️ I’ve got weather insights ready for your trip. Let me know what you’d like to see.";
  } else if (msg.includes("packing")) {
    reply = "🎒 I’ve got packing tips ready to help you travel prepared.";
  } else if (msg.includes("safety")) {
    reply = "🛡️ Safety first! I’ll guide you through important safety tips.";
  } else if (msg.includes("hello") || msg.includes("hi")) {
    reply =
      "Hey there! 😊 I’ve got your destination—let’s get you travel-ready.";
  }

  addBotMessage(reply);
}

// Initialize when page loads
window.addEventListener("load", function () {
  console.log("Chatbot initialized!");

  // Show welcome message
  addBotMessage(
    `👋 Hey! I'm TripMate. Ready to explore ${
      new URLSearchParams(window.location.search).get("place") ||
      "your destination"
    }? 🌍`
  );

  // Add Enter key listener
  const chatInput = document.getElementById("chatInput");
  chatInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  });
});
