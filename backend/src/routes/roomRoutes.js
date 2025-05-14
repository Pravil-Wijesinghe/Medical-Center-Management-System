const express = require("express");
const { addRoom, assignRoomToDoctor, updateRoom, getAllRooms, getRoomById, getRoomCount } = require("../controllers/roomController");

const router = express.Router();

router.post("/add", addRoom);
router.post("/assign", assignRoomToDoctor);
router.put("/update", updateRoom);
router.get("/all", getAllRooms);
router.get("/details/:roomId", getRoomById);
router.get("/count", getRoomCount);

module.exports = router;
