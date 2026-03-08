const express = require("express");
const router = express.Router();
const { planTrip } = require("../controllers/tripcontroller");

router.post("/", planTrip);

module.exports = router;