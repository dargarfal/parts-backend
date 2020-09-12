const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  ownercarSale: {
    type: Schema.Types.ObjectId,
    ref: 'Car'
  },
  ownerpartSale: {
    type: Schema.Types.ObjectId,
    ref: 'Part'
  },
  owneruserSale: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  amountSale: {
    type: Number,
    required: true
  },
  dateofSale: {
    type: Date,
    required: true
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model('Sale', SaleSchema);