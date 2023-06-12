const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    birthday: {
      type: String,
      required: true,
    },
    passport: {
      type: String,
      required: true,
    },
    driver_license: {
      type: Number,
      required: true,
    },
    adress: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Client", clientSchema);
