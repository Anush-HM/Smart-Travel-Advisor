const dotenv = require('dotenv');
dotenv.config({ path: __dirname + '/.env' });
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const weatherRoutes = require("./routes/weather");
app.use("/api/weather", weatherRoutes);

const aiRoutes = require("./routes/ai");
app.use("/api/ai", aiRoutes);

const chatRoutes = require("./routes/chat");
app.use("/api/chat", chatRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
