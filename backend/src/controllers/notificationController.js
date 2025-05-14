const db = require("../config/db");

// 1. Create Notification
const createNotification = (req, res) => {
    const { userId, title, message } = req.body;

    if (!userId || !title || !message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const query = `INSERT INTO notifications (userId, title, message) VALUES (?, ?, ?)`;

    db.query(query, [userId, title, message], (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(201).json({ message: "Notification created", notificationId: result.insertId });
    });
};

// 2. Get Notifications by User ID
const getNotificationsByUser = (req, res) => {
    const { userId } = req.params;

    const query = `
        SELECT n.*, u.username, u.role, u.profilePicture
        FROM notifications n
        JOIN user u ON n.userId = u.userId
        WHERE n.userId = ?
        ORDER BY n.createdAt DESC
    `;

    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json(results);
    });
};

// 3. Get Notification Details by ID
const getNotificationById = (req, res) => {
    const { notificationId } = req.params;

    const query = `
        SELECT n.*, u.username, u.role, u.profilePicture,
               COALESCE(d.firstName, p.firstName, s.firstName) AS firstName,
               COALESCE(d.lastName, p.lastName, s.lastName) AS lastName,
               COALESCE(d.email, p.email, s.email) AS email
        FROM notifications n
        JOIN user u ON n.userId = u.userId
        LEFT JOIN doctor d ON u.userId = d.userId
        LEFT JOIN patient p ON u.userId = p.userId
        LEFT JOIN staff s ON u.userId = s.userId
        WHERE n.notificationId = ?
    `;

    db.query(query, [notificationId], (err, results) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        if (results.length === 0) return res.status(404).json({ message: "Notification not found" });
        res.status(200).json(results[0]);
    });
};

// 4. Mark Notification as Read
const markNotificationAsRead = (req, res) => {
    const { notificationId } = req.params;

    const query = `
        UPDATE notifications
        SET isRead = TRUE
        WHERE notificationId = ?
    `;

    db.query(query, [notificationId], (err) => {
        if (err) return res.status(500).json({ message: "Database error", error: err });
        res.status(200).json({ message: "Notification marked as read" });
    });
};

module.exports = {
    createNotification,
    getNotificationsByUser,
    getNotificationById,
    markNotificationAsRead
};