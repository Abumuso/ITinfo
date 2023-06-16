const { errorHandler } = require("../helpers/error_handler");
const Description = require("../models/description");
const { default: mongoose } = require("mongoose");

const addDescription = async (req, res) => {
  try {
    //AddDescription
    const { description, category_id } = req.body;

    const newDescription = await Description({
      description,
      category_id,
    });
    await newDescription.save();
    res.status(200).send({ message: " Yangi description qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getDescriptions = async (req, res) => {
  try {
    //GetDescriptions
    const description = await Description.find({});
    if (!description) {
      return res.status(400).send({ message: "description topilmadi" });
    }
    res.json({ description });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDescriptionById = async (req, res) => {
  try {
    //GetDescriptionById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const description = await Description.findOne({ _id: req.params.id });
    if (!description) {
      return res.status(400).send({ message: "description topilmadi" });
    }
    res.json({ description });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDescription = async (req, res) => {
  try {
    //UpdateDescription
    const description = await Description.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!description) {
      return res.status(400).send({ message: "description topilmadi" });
    }
    res.json({ description });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteDescription = async (req, res) => {
  try {
    const deletedDescription = await Description.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedDescription) {
      return res.status(404).json({ message: "description not found" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addDescription,
  getDescriptions,
  getDescriptionById,
  updateDescription,
  deleteDescription,
};
