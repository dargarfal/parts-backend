const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PartSchema = new Schema({
  namePart: {
    type: String,
    required: true
  },
  codePart: {
    type: String,
    unique: true
  },
  princePart: {
    type: Number
  },
  statusPart: {
    type: String,
    enum: [
      'Buena',
      'Defectuosa',
      'Vendida'
    ]
  },
  ownercarPart: {
    type: Schema.Types.ObjectId,
    ref: 'Car'
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Part', PartSchema);