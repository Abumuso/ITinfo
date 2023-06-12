const { Schema, model } = require("mongoose");

const price_typeSchema = new Schema(
  {
    price_per_day: {
      type: Number,
      required: true,
    },
    price_per_hour: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Price_type", price_typeSchema);
