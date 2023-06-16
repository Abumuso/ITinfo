const { Schema, model } = require("mongoose");

const desc_QASchema = new Schema(
  {
    qa_id: {
      type: Schema.Types.ObjectId,
      ref: "Question_Answer",
    },
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "Description",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Desc_QA", desc_QASchema);
