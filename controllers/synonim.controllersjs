const { errorHandler } = require("../helpers/error_handler");
const Synonim = require("../models/synonym");
const { default: mongoose } = require("mongoose");

const addSynonim = async (req, res) => {
  try {
    //AddSynonim
    const { dict_id, desc_id } = req.body;

    const newSynonim = await Synonim({
      dict_id,
      desc_id,
    });
    await newSynonim.save();
    res.status(200).send({ message: " Yangi synonim qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getSynonims = async (req, res) => {
  try {
    //GetSynonims
    const rents = await Synonim.find({});
    if (!rents) {
      return res.status(400).send({ message: "synonim topilmadi" });
    }
    res.json({ rents });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getSynonimById = async (req, res) => {
  try {
    //GetSynonimById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const synonim = await Synonim.findOne({ _id: req.params.id });
    if (!synonim) {
      return res.status(400).send({ message: "synonim topilmadi" });
    }
    res.json({ synonim });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateSynonim = async (req, res) => {
  try {
    //UpdateSynonim
    const synonim = await Synonim.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!synonim) {
      return res.status(400).send({ message: "synonim topilmadi" });
    }
    res.json({ synonim });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteSynonim = async (req, res) => {
  try {
    const deletedSynonim = await Synonim.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedSynonim) {
      return res.status(404).json({ message: "synonim not found" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addSynonim,
  getSynonims,
  getSynonimById,
  updateSynonim,
  deleteSynonim,
};
