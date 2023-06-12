const { Router } = require("express");
const {
  getRentById,
  addRent,
  deleteRent,
  updateRent,
  getRents,
} = require("../controllers/rent.controller");

const router = Router();

router.post("/", addRent);
router.get("/", getRents);
router.get("/:id", getRentById);
router.delete("/", deleteRent);
router.put("/", updateRent);

module.exports = router;
