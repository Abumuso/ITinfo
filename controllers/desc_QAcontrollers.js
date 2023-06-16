const { errorHandler } = require("../helpers/error_handler");
const Desq_QA = require("../models/desc_QA");
const { default: mongoose } = require("mongoose");

const addDesq_QA = async (req, res) => {
  try {
    //AddDesq_QA
    const { qa_id, desc_id } = req.body;

    const newDesq_QA = await Desq_QA({
      qa_id,
      desc_id,
    });
    await newDesq_QA.save();
    res.status(200).send({ message: " Yangi desk_qa qo'shildi" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getDesq_QAs = async (req, res) => {
  try {
    //GetDesq_QAs
    const rents = await Desq_QA.find({});
    if (!rents) {
      return res.status(400).send({ message: "desk_qa topilmadi" });
    }
    res.json({ rents });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDesq_QAById = async (req, res) => {
  try {
    //GetDesq_QAById
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({ message: "Incorect ID" });
    }
    const desk_qa = await Desq_QA.findOne({ _id: req.params.id });
    if (!desk_qa) {
      return res.status(400).send({ message: "desk_qa topilmadi" });
    }
    res.json({ desk_qa });
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateDesq_QA = async (req, res) => {
  try {
    //UpdateDesq_QA
    const desk_qa = await Desq_QA.findOneAndUpdate({
      _id: req.params.id,
    });
    if (!desk_qa) {
      return res.status(400).send({ message: "desk_qa topilmadi" });
    }
    res.json({ desk_qa });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteDesq_QA = async (req, res) => {
  try {
    const deletedDesq_QA = await Desq_QA.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletedDesq_QA) {
      return res.status(404).json({ message: "desk_qa not found" });
    }
    res.json({ message: "Deleted Successfully" });
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  addDesq_QA,
  getDesq_QAs,
  getDesq_QAById,
  updateDesq_QA,
  deleteDesq_QA,
};
