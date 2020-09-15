const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartSchema = new Schema({
  namePart: {
    type: String,
    required: true,
  },
  codePart: {
    type: String,
    unique: true,
  },
  pricePart: {
    type: Number,
  },
  realsalepricePart: {
    type: Number,
  },
  statusPart: {
    type: String,
    enum: ["Buena", "Defectuosa", "Vendida"],
    default: "Buena",
  },
  ownercarPart: {
    type: Schema.Types.ObjectId,
    ref: "Car",
  },
  userCreate: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Part", PartSchema);
