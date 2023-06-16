const { errorHandler } = require("../helpers/error_handler");
const Category = require("../models/category");
const { default: mongoose } = require("mongoose");
const { categoryValidation } = require("../validations/category");

const addCategory = async (req, res) => {
  try {
    const { error, value } = categoryValidation(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    const { category_name, parent_category_id } = value;

    const category = await Category.findOne({
      category_name: { $regax: category_name, $options: "i" },
    });
    if (category) {
      return res
        .status(400)
        .send({ message: "Bunday kategoriya avval kiritilgan" });
    }
    const newCategory = await Category({
      category_name,
      parent_category_id,
    });
    await newCategory.save();
    res.status(200).send({ message: " Yangi Category qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getCategories = async (req, res) => {
  try {
    //GetCategory
    const categories = await Category.find({}).populate("parent_category_id");
    if (!categories) {
      return res.status(400).send({ message: "Category topilmadi" });
    }
    res.json({ categories });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategoryById = async (req, res) => {
  try {
    //GetCategoryById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const category = await Category.findOne({ _id: req.params.id });
    if (!category) {
      return res.status(400).send({ message: "Category topilmadi" });
    }
    res.json({ category });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCategory = async (req, res) => {
  try {
    //UpdateCategory
    const category = await Category.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!category) {
      return res.status(400).send({ message: "Category topilmadi" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteCategory = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedCategory) {
      return res.status(404).json({ message: "Category topilmadi" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
