const db = require("../config/db");

// Add a new room
const addRoom = (req, res) => {
    const { roomNumber, availabilityId } = req.body;

    if (!roomNumber || !availabilityId) {
        return res.status(400).json({ message: "Room number and availabilityId are required" });
    }

    const sql = `
        INSERT INTO rooms (roomNumber, availabilityId, isAssigned, doctorId, createdAt, updatedAt)
        VALUES (?, ?, 0, NULL, NOW(), NOW())
    `;

    db.query(sql, [roomNumber, availabilityId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(201).json({ message: "Room added successfully", roomId: result.insertId });
    });
};

// Assign a room to a doctor
const assignRoomToDoctor = (req, res) => {
    const { roomId, doctorId } = req.body;

    if (!roomId || !doctorId) {
        return res.status(400).json({ message: "Room ID and Doctor ID are required" });
    }

    const sql = `UPDATE rooms SET doctorId = ?, isAssigned = 1, updatedAt = NOW() WHERE roomId = ?`;

    db.query(sql, [doctorId, roomId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ message: "Room assigned to doctor successfully" });
    });
};

// Update room details
const updateRoom = (req, res) => {
    const { roomId, roomNumber, availabilityId, isAssigned } = req.body;

    if (!roomId) {
        return res.status(400).json({ message: "Room ID is required" });
    }

    const sql = `UPDATE rooms SET roomNumber = ?, availabilityId = ?, isAssigned = ?, updatedAt = NOW() WHERE roomId = ?`;

    db.query(sql, [roomNumber, availabilityId, isAssigned, roomId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json({ message: "Room updated successfully" });
    });
};

// Get all rooms
const getAllRooms = (req, res) => {
    const sql = `SELECT * FROM rooms`;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        res.status(200).json(results);
    });
};

// Get room details by ID
const getRoomById = (req, res) => {
    const { roomId } = req.params;

    if (!roomId) {
        return res.status(400).json({ message: "Room ID is required" });
    }

    const sql = `SELECT * FROM rooms WHERE roomId = ?`;

    db.query(sql, [roomId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(result[0]);
    });
};

const getRoomCount = (req, res) => {
    const query = `SELECT COUNT(*) AS totalRooms FROM rooms`;

    db.query(query, (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error", error: err });
        }

        res.status(200).json({ totalRooms: result[0].totalRooms });
    });
};

module.exports = {
    addRoom,
    assignRoomToDoctor,
    updateRoom,
    getAllRooms,
    getRoomById,
    getRoomCount,
};
