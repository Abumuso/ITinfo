const { Schema, model } = require("mongoose");

const Client = require("./client");
const Car = require("./car");

const rentSchema = new Schema(
  {
    from_datetime: {
      type: Date,
      required: true,
    },
    to_datetime: {
      type: Date,
      required: true,
    },
    rent_status: {
      type: String,
      required: true,
    },
    rent_type: {
      type: String,
      required: true,
    },
    client: {
      type: Schema.Types.ObjectId,
      ref: "Client",
    },
    subclient: Client.schema,
    car: {
      type: Schema.Types.ObjectId,
      ref: "Car",
    },
    subclient: Car.schema,
  },
  {
    versionKey: false,
  }
);

module.exports = model("rent", rentSchema);
