const { Router } = require("express");
const {
  addDescription,
  getDescriptions,
  getDescriptionById,
  deleteDescription,
  updateDescription,
} = require("../controllers/description.controllers");

const router = Router();

router.post("/", addDescription);
router.get("/", getDescriptions);
router.get("/:id", getDescriptionById);
router.delete("/", deleteDescription);
router.put("/", updateDescription);

module.exports = router;
