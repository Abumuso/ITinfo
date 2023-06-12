const { errorHandler } = require("../helpers/error_handler");
const Client = require("../models/client");
const { default: mongoose } = require("mongoose");

const addClient = async (req, res) => {
  try {
    //AddClient
    const {
      first_name,
      last_name,
      birthday,
      passport,
      driver_license,
      adress,
      phone,
    } = req.body;

    const newClient = await Client({
      first_name,
      last_name,
      birthday,
      passport,
      driver_license,
      adress,
      phone,
    });
    await newClient.save();
    res.status(200).send({ message: " Yangi Client qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getClients = async (req, res) => {
  try {
    //GetClient
    const client = await Client.find({});
    if (!client) {
      return res.status(400).send({ message: "Client topilmadi" });
    }
    res.json({ client });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getClientById = async (req, res) => {
  try {
    //GetClientById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const client = await Client.findOne({ _id: req.params.id });
    if (!client) {
      return res.status(400).send({ message: "Client topilmadi" });
    }
    res.json({ client });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateClient = async (req, res) => {
  try {
    //UpdateClient
    const client = await Client.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!client) {
      return res.status(400).send({ message: "Client topilmadi" });
    }
    res.json({ user });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteClient = async (req, res) => {
  try {
    const deletedClient = await Client.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedClient) {
      return res.status(404).json({ message: "Client topilmadi" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};
