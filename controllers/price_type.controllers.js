const { errorHandler } = require("../helpers/error_handler");
const Price_type = require("../models/price_type");
const { default: mongoose } = require("mongoose");

const addPrice_type = async (req, res) => {
  try {
    //AddPrice_type
    const { price_per_day, price_per_hour } = req.body;

    const newPrice_type = await Price_type({
      price_per_day,
      price_per_hour,
    });
    await newPrice_type.save();
    res.status(200).send({ message: " Yangi price_type qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getPrice_types = async (req, res) => {
  try {
    //GetPrice_types
    const price_types = await Price_type.find({});
    if (!price_types) {
      return res.status(400).send({ message: "price_type topilmadi" });
    }
    res.json({ price_types });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getPrice_typeById = async (req, res) => {
  try {
    //GetPrice_typeById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const price_type = await Price_type.findOne({ _id: req.params.id });
    if (!price_type) {
      return res.status(400).send({ message: "price_type topilmadi" });
    }
    res.json({ price_type });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updatePrice_type = async (req, res) => {
  try {
    //UpdatePrice_type
    const price_type = await Price_type.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!price_type) {
      return res.status(400).send({ message: "price_type topilmadi" });
    }
    res.json({ price_type });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deletePrice_type = async (req, res) => {
  try {
    const deletedPrice_type = await Price_type.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedPrice_type) {
      return res.status(404).json({ message: "price_type not found" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addPrice_type,
  getPrice_types,
  getPrice_typeById,
  updatePrice_type,
  deletePrice_type,
};
