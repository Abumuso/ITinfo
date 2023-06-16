const { Router } = require("express");
const {
  addCategory,
  getCategories,
  getCategoryById,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");

const router = Router();

router.post("/", addCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.delete("/", deleteCategory);
router.put("/", updateCategory);

module.exports = router;
