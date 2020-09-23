const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  nameBrand: {
    type: String,
    required: true,
    unique: true,
  },
  logoBrand: {
    type: String
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

//Logos are loaded from https://www.carlogos.org/
module.exports = mongoose.model("Brand", BrandSchema);
