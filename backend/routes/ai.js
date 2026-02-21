const express = require("express");
const router = express.Router();
const { getAIContent } = require("../controllers/aicontroller");

router.get("/", getAIContent);

module.exports = router;