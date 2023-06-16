const { errorHandler } = require("../helpers/error_handler");
const Author = require("../models/author");
const { authorValidation } = require("../validations/author");

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
    const newAuthor = await Author({
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
    });
    await newAuthor.save();
    res.status(200).send({ message: " Yangi Author qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAuthors = async (req, res) => {
  try {
    //GetAuthor
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
};
