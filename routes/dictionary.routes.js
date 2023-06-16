const { Router } = require("express");
const {
  getDictById,
  getDicts,
  AddTerm,
  deleteDict,
  updateDict,
} = require("../controllers/dictionary.controllers");

const router = Router();

router.post("/", AddTerm);
router.get("/", getDicts);
router.get("/:id", getDictById);
router.delete("/", deleteDict);
router.put("/", updateDict);

module.exports = router;
