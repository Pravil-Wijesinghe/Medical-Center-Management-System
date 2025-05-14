const express = require("express");
const { logAction, getSystemLogs } = require("../controllers/systemlogController");
const router = express.Router();

// Route for creating a new system log entry
router.post("/log", logAction);

// Route for getting all system logs (with pagination, if needed)
router.post("/log-list", getSystemLogs);

module.exports = router;