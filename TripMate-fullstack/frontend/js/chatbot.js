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
async function sendImage() {
  const input = document.getElementById("imageInput");
  const file = input.files[0];
  if (!file) return;

  // Validate file size (max 5MB)
  if (file.size > 5 * 1024 * 1024) {
    addBotMessage("❌ Image too large! Please select an image under 5MB.");
    return;
  }

  // Validate file type
  if (!file.type.startsWith('image/')) {
    addBotMessage("❌ Please select a valid image file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = async function(e) {
    const imageUrl = e.target.result;
    const base64Image = imageUrl.split(',')[1]; // Remove data:image/jpeg;base64, prefix
    
    // Display image in chat
    const chatBox = document.getElementById("chatBox");
    const img = document.createElement("img");
    img.src = imageUrl;
    img.className = "self-end rounded-xl max-w-[200px] border border-white/20 mb-2";
    chatBox.appendChild(img);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Show analyzing message
    addBotMessage("🔍 Analyzing your image...");

    try {
      // Send to backend for analysis
      const response = await fetch('http://localhost:5000/api/image/analyze', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          image: base64Image,
          city: city
        })
      });
      
      const data = await response.json();
      
      // Remove analyzing message
      const messages = chatBox.querySelectorAll('.self-start');
      const lastBotMessage = messages[messages.length - 1];
      if (lastBotMessage && lastBotMessage.textContent.includes("Analyzing")) {
        lastBotMessage.remove();
      }
      
      // Show AI response
      if (data.error) {
        addBotMessage("❌ Sorry, I couldn't analyze the image. Error: " + data.error);
      } else {
        addBotMessage(data.result);
      }
      
    } catch (error) {
      console.error('Error analyzing image:', error);
      
      // Remove analyzing message
      const messages = chatBox.querySelectorAll('.self-start');
      const lastBotMessage = messages[messages.length - 1];
      if (lastBotMessage && lastBotMessage.textContent.includes("Analyzing")) {
        lastBotMessage.remove();
      }
      
      addBotMessage("❌ Sorry, couldn't analyze the image. Make sure the backend server is running!");
    }
  };
  
  reader.onerror = function() {
    addBotMessage("❌ Failed to read the image file. Please try again.");
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