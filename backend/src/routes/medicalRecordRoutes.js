const express = require("express");
const {
  createMedicalRecord,
  getMedicalRecordById,
  searchMedicalRecords,
  updateMedicalRecord
} = require("../controllers/medicalRecordController");

const router = express.Router();

router.post("/create", createMedicalRecord);
router.get("/:recordId", getMedicalRecordById);
router.post("/search", searchMedicalRecords);
router.put("/update/:recordId", updateMedicalRecord);

module.exports = router;
