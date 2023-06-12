const { Schema, model } = require("mongoose");

const Price_type = require("./price_type");

const carSchema = new Schema(
  {
    car_number: {
      type: String,
      required: true,
    },
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    miliage: {
      type: Number,
      required: true,
    },
    price_type: {
      type: Schema.Types.ObjectId,
      ref: "Price_type",
    },
    subprice_type: Price_type.schema,
  },
  {
    versionKey: false,
  }
);

module.exports = model("Car", carSchema);
