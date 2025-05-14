const express = require("express");
const router = express.Router();
const {
    createNotification,
    getNotificationsByUser,
    getNotificationById,
    markNotificationAsRead
} = require("../controllers/notificationController");

router.post("/create", createNotification);
router.get("/user/:userId", getNotificationsByUser);
router.get("/:notificationId", getNotificationById);
router.put("/mark-read/:notificationId", markNotificationAsRead);

module.exports = router;