const { errorHandler } = require("../helpers/error_handler");
const Car = require("../models/car");
const { default: mongoose } = require("mongoose");

const addCar = async (req, res) => {
  try {
    //AddCar
    const { car_number, make, model, year, milieage, price_type } = req.body;

    const newCar = await Car({
      car_number,
      make,
      model,
      year,
      milieage,
      price_type,
    });
    await newCar.save();
    res.status(200).send({ message: " Yangi avto qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getCars = async (req, res) => {
  try {
    //GetCars
    const cars = await Car.find({});
    if (!cars) {
      return res.status(400).send({ message: "avto topilmadi" });
    }
    res.json({ cars });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCarById = async (req, res) => {
  try {
    //GetCarById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const car = await Car.findOne({ _id: req.params.id });
    if (!car) {
      return res.status(400).send({ message: "avto topilmadi" });
    }
    res.json({ car });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCar = async (req, res) => {
  try {
    //UpdateCar
    const car = await Car.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!car) {
      return res.status(400).send({ message: "avto topilmadi" });
    }
    res.json({ car });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteCar = async (req, res) => {
  try {
    const deletedCar = await Car.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedCar) {
      return res.status(404).json({ message: "avto not found" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
};
