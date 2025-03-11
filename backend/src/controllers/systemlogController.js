const db = require("../config/db");

const logAction = (req, res) => {
    const { userId, actionPerformed } = req.body;

    if (!userId || !actionPerformed) {
        return res.status(400).json({ message: "UserId and ActionPerformed are required" });
    }

    const query = `
        INSERT INTO systemlogs (userId, actionPerformed)
        VALUES (?, ?)
    `;

    db.query(query, [userId, actionPerformed], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        res.status(201).json({ message: "Log added successfully", logId: result.insertId });
    });
};

const getSystemLogs = (req, res) => {
    const { userId, actionPerformed, startDate, endDate, limit = 10, offset = 0 } = req.body;

    let whereClause = "WHERE 1=1";
    const queryParams = [];

    if (userId) {
        whereClause += " AND s.userId = ?";
        queryParams.push(userId);
    }

    if (actionPerformed) {
        whereClause += " AND s.actionPerformed LIKE ?";
        queryParams.push(`%${actionPerformed}%`);
    }

    if (startDate) {
        whereClause += " AND s.timeStamps >= ?";
        queryParams.push(startDate);
    }

    if (endDate) {
        whereClause += " AND s.timeStamps <= ?";
        queryParams.push(endDate);
    }

    const query = `
        SELECT 
            s.logId, 
            s.userId, 
            u.username, 
            u.role, 
            s.actionPerformed, 
            s.timeStamps
        FROM systemlogs s
        JOIN user u ON s.userId = u.userId
        ${whereClause}
        ORDER BY s.timeStamps DESC
        LIMIT ? OFFSET ?
    `;

    queryParams.push(parseInt(limit));
    queryParams.push(parseInt(offset));

    db.query(query, queryParams, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        res.status(200).json(result);
    });
};

module.exports = { logAction, getSystemLogs };