const { Router } = require("express");
const {
  addAuthor,
  getAuthors,
  getAuthorById,
  deleteAuthor,
  updateAuthor,
  loginAuthor,
} = require("../controllers/author.controller");

const authorPolice = require("../middleware/authorPolice");
const authorRolesPolice = require("../middleware/authorRolesPolice");

const router = Router();

router.post("/", addAuthor);
router.post("/login", loginAuthor);
router.get("/", authorPolice, getAuthors);
router.get(
  "/:id",
  authorRolesPolice(["READ", "WRITE", "CHANGE", "DELETE"]),
  getAuthorById
);
router.delete("/", deleteAuthor);
router.put("/", updateAuthor);

module.exports = router;
