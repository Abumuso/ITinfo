const { errorHandler } = require("../helpers/error_handler");
const Rent = require("../models/rent");
const { default: mongoose } = require("mongoose");

const addRent = async (req, res) => {
  try {
    //AddRent
    const {
      rent_number,
      make,
      model,
      year,
      milieage,
      price_type,
      car,
      client,
      amount,
    } = req.body;

    const newRent = await Rent({
      rent_number,
      make,
      model,
      year,
      milieage,
      price_type,
      car,
      client,
      amount,
    });
    await newRent.save();
    res.status(200).send({ message: " Yangi rent qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getRents = async (req, res) => {
  try {
    //GetRents
    const rents = await Rent.find({});
    if (!rents) {
      return res.status(400).send({ message: "rent topilmadi" });
    }
    res.json({ rents });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getRentById = async (req, res) => {
  try {
    //GetRentById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const rent = await Rent.findOne({ _id: req.params.id });
    if (!rent) {
      return res.status(400).send({ message: "rent topilmadi" });
    }
    res.json({ rent });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateRent = async (req, res) => {
  try {
    //UpdateRent
    const rent = await Rent.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!rent) {
      return res.status(400).send({ message: "rent topilmadi" });
    }
    res.json({ rent });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteRent = async (req, res) => {
  try {
    const deletedRent = await Rent.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedRent) {
      return res.status(404).json({ message: "rent not found" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addRent,
  getRents,
  getRentById,
  updateRent,
  deleteRent,
};
