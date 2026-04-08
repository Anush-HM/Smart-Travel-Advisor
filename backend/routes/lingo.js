const express = require("express");
const router = express.Router();
const { getLocalLingo } = require("../controllers/lingocontroller");
router.post("/", getLocalLingo);
module.exports = router;