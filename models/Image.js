const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  publicidImage: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  uriImage: {
    type: String,
    unique: true,
    required: true
  },
  ownercarImage: {
    type: Schema.Types.ObjectId,
    ref: 'Car'
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Image', ImageSchema);