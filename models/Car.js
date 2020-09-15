const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CarSchema = new Schema({
  brandCar: {
    type: Schema.Types.ObjectId,
    ref: "Brand",
  },
  modelCar: {
    type: String,
    unique: true,
  },
  yearCar: {
    type: Number,
  },
  plateCar: {
    type: String,
    unique: true,
  },
  dateplateCar: {
    type: Date,
  },
  chasisCar: {
    type: String,
    trim: true,
    unique: true,
  },
  registerdayCar: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  locationCar: {
    type: Schema.Types.ObjectId,
    ref: "Location",
  },
  priceCar: {
    type: Number,
  },
  currentsaleCar: {
    type: Number,
    default: 0,
  },
  enabledCar: {
    type: Boolean,
    default: true,
  },
  finishedCar: {
    type: Boolean,
    default: false,
  },
  imagesCar: [
    {
      type: Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  partsCar: [
    {
      type: Schema.Types.ObjectId,
      ref: "Part",
    },
  ],
  userCreate: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Car", CarSchema);
