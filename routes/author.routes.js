const { Router } = require("express");
const {
  addAuthor,
  getAuthors,
  getAuthorById,
  deleteAuthor,
  updateAuthor,
} = require("../controllers/author.controller");

const router = Router();

router.post("/", addAuthor);
router.get("/", getAuthors);
router.get("/:id", getAuthorById);
router.delete("/", deleteAuthor);
router.put("/", updateAuthor);

module.exports = router;
