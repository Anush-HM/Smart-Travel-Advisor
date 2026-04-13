# 🌍 TripMate – AI-Powered Travel Companion

**An AI-powered travel planning and local communication web app that helps travelers plan trips, speak with locals, and explore destinations.**

---

## ✨ Features

* 🗺️ **AI Trip Planner** — generates complete day-by-day itineraries with travel options, hotels, and budget breakdown
* 🗣️ **Local Lingo** — translates any phrase into local languages with native script, romanized pronunciation, syllable breakdown, and stress guide
* 🤳 **Show Local** — fullscreen native text display to show locals directly without speaking
* 🌤️ **Weather Info** — real-time weather data for any destination
* 🤖 **AI Travel Chatbot** — answers any travel-related question about your destination
* 💬 **Chat History** — saves conversations with destination context in MongoDB
* 📸 **Image Upload** — upload a photo and get AI-generated information and insights about it

---

## 🧰 Tech Stack

**Backend:** Node.js, Express.js, MongoDB \
**AI:** Groq API (Llama 3.3 70B) \
**APIs & Services:** OpenWeatherMap API \
**Frontend:** HTML, CSS, JavaScript, Tailwind CSS

---

## 🚀 Run Locally

### Prerequisites

```bash
node --version
```

* A free account on [MongoDB Atlas](https://cloud.mongodb.com)
* A free [Groq API key](https://console.groq.com)
* A free [OpenWeatherMap API key](https://openweathermap.org)

---

### Installation

Clone the project

```bash
git clone https://github.com/Anush-HM/TripMate-AI-Advisor.git
```

Go to the project directory

```bash
cd TripMate-AI-Advisor
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` folder and add the following:

```env
MONGO_URI=mongodb+srv://<username>:<password>@yourcluster.mongodb.net/smart_travel?retryWrites=true&w=majority&appName=YourCluster
GROQ_API_KEY=your_groq_api_key
WEATHER_API_KEY=your_openweathermap_api_key
```

---

## 🗄️ Database Setup

This project uses MongoDB Atlas as its primary database.

- The database schema and collections are defined using Mongoose models in the codebase
- No manual database or collection creation is required
- Collections are automatically created when the application runs and data is inserted

MongoDB Setup Steps:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) and create a free account
2. Create a new **Cluster** (choose free M0 tier)
3. Create a database user (username + password)
4. Allow network access — Add IP: `0.0.0.0/0` for development
5. Click **Connect → Drivers → Node.js**
6. Copy the connection string and add it to `MONGO_URI` in your `.env` file

---

## 💡 API Reference

### 🗺️ Trip Planner

```
POST /api/trip
```

Takes origin, destination, number of days, budget and currency — returns a complete AI-generated itinerary with hotels, travel options, and budget breakdown.

---

### 🗣️ Local Lingo

```
POST /api/lingo
```

Takes destination and a sentence — returns translations in local languages with native script, romanized pronunciation, syllables, stress guide, and cultural tips.

---

### 🌤️ Weather

```
GET /api/weather
```

Returns real-time weather data for a given destination including temperature, humidity, and conditions.

---

### 🤖 AI Assistant

```
POST /api/ai
```

Takes a travel-related question and returns an AI-generated answer.

---

### 💬 Chat

```
POST /api/chat
```

Sends a message to the AI travel chatbot and returns a response. Conversation is saved to MongoDB with destination context.

---

### 📸 Image Upload

```
POST /api/image
```

User uploads an image and gets AI-generated information and insights about it.
