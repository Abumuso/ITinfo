const { errorHandler } = require("../helpers/error_handler");
const Author = require("../models/author");
const { authorValidation } = require("../validations/author");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("config");

const generateAccessToken = (id, is_export, authorRoles) => {
  const payload = {
    id,
    is_export,
    authorRoles,
  };
  return jwt.sign(payload, config.get("secret"), { expiresIn: "1h" });
};

const addAuthor = async (req, res) => {
  try {
    const { error, value } = authorValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const {
      author_first_name,
      author_last_name,
      author_nick_name,
      author_password,
      author_email,
      author_phone,
      author_info,
      author_position,
      author_photo,
      is_export,
    } = value;

    const author = await Author.findOne({ author_email });
    if (author) {
      return res
        .status(400)
        .send({ message: "Bunday author avval kiritilgan" });
    }
    const hashedPassword = bcrypt.hashSync(author_password, 7);
    const newAuthor = await Author({
      author_first_name,
      author_last_name,
      author_nick_name,
      author_password: hashedPassword,
      author_email,
      author_phone,
      author_info,
      author_position,
      author_photo,
      is_export,
    });
    await newAuthor.save();
    res.status(200).send({ message: " Yangi Author qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const loginAuthor = async (req, res) => {
  try {
    const { author_email, author_password } = req.body;
    const author = await Author.findOne({ author_email });
    if (!author)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });
    const validPassword = bcrypt.compareSync(
      author_password, //Frontdan kelgan ochiq password
      author.author_password //bazadan olingan hashlangan password
    );
    if (!validPassword)
      return res.status(400).send({ message: "Email yoki parol noto'g'ri" });

    const token = generateAccessToken(author._id, author.is_export, [
      "READ",
      "WRITE",
    ]);

    res.status(200).send({ token: token });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAuthors = async (req, res) => {
  try {
    const authors = await Author.find({}).populate("parent_author_id");
    if (!authors) {
      return res.status(400).send({ message: "Author topilmadi" });
    }
    res.json({ authors });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAuthorById = async (req, res) => {
  try {
    //GetAuthorById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const author = await Author.findById(req.params.id);
    if (!author) {
      return res.status(400).send({ message: "Author topilmadi" });
    }
    res.json({ author });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateAuthor = async (req, res) => {
  try {
    //UpdateAuthor
    const author = await Author.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!author) {
      return res.status(400).send({ message: "Author topilmadi" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteAuthor = async (req, res) => {
  try {
    const deletedAuthor = await Author.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedAuthor) {
      return res.status(404).json({ message: "Author topilmadi" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addAuthor,
  getAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  loginAuthor,
};
