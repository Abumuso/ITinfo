const { errorHandler } = require("../helpers/error_handler");
const Dict = require("../models/dictionary");
const { default: mongoose } = require("mongoose");

const AddTerm = async (req, res) => {
  try {
    //AddTerm
    const { term } = req.body;
    const dict = await Dict.findOne({
      term: { $regax: term, $options: "i" },
    });
    if (dict) {
      return res
        .status(400)
        .send({ message: "Bunday termin avval kiritilgan" });
    }
    const newTerm = await Dict({
      term,
      letter: term[0],
    });
    await newTerm.save();
    res.status(200).send({ message: " Yangi termin qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getTerminByLetter = async (req, res) => {
  try {
    const letter = req.params.letter;
    const terms = await Dict.find({ letter });

    if (!terms) {
      return res.status(400).send({ message: "Birorta termin topilmadi" });
    }
    res.json({ terms });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getDicts = async (req, res) => {
  try {
    //GetDicts
    const dicts = await Dict.find({});
    if (!dicts) {
      return res.status(400).send({ message: "dictionary topilmadi" });
    }
    res.json({ dicts });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDictById = async (req, res) => {
  try {
    //GetDictById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const dict = await Dict.findOne({ _id: req.params.id });
    if (!dict) {
      return res.status(400).send({ message: "dictionary topilmadi" });
    }
    res.json({ dict });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDict = async (req, res) => {
  try {
    //UpdateDict
    const dict = await Dict.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!dict) {
      return res.status(400).send({ message: "dictionary topilmadi" });
    }
    res.json({ dict });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteDict = async (req, res) => {
  try {
    const deletedDict = await Dict.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedDict) {
      return res.status(404).json({ message: "dictionary not found" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  AddTerm,
  getDicts,
  getDictById,
  updateDict,
  deleteDict,
  getTerminByLetter,
};
