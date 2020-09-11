const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  nameBrand: {
    type: String,
    required: true,
    unique: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Brand', BrandSchema);