const { Router } = require("express");
const {
  getPrice_typeById,
  addPrice_type,
  deletePrice_type,
  updatePrice_type,
  getPrice_types,
} = require("../controllers/price_type.controllers");

const router = Router();

router.post("/", addPrice_type);
router.get("/", getPrice_types);
router.get("/:id", getPrice_typeById);
router.delete("/", deletePrice_type);
router.put("/", updatePrice_type);

module.exports = router;
