const express = require("express");
const {
    addDrug,
    updateDrug,
    getDrugById,
    getAllDrugs,
    deleteDrug
} = require("../controllers/drugController");

const router = express.Router();

router.post("/add", addDrug);
router.put("/update/:drugId", updateDrug);
router.delete("/delete/:drugId", deleteDrug);
router.get("/all", getAllDrugs);
router.get("/details/:drugId", getDrugById);


module.exports = router;
