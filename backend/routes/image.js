const express = require("express");
const router = express.Router();
const { analyzeImage } = require("../controllers/imagecontroller");

router.post("/analyze", analyzeImage);

module.exports = router;