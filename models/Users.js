const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  userEmail: {
    type: String,
    trim: true,
    unique: true
  },
  userPass: {
    type: String,
    required: true,
    trim: true
  },
  userRole: {
    type: String,
    enum: [
      'administrador',
      'usuario'
    ]
  },
  createAt: {
    type: Date,
    default: Date.now()
  }
});

//Executing the crypt before the method is executed save()
UserSchema.pre('save', async function(next){

  try {
    const salts = await bcrypt.genSalt(10);
    this.userPass = await bcrypt.hash(this.userPass, salts);
    next();
  } catch (error) {
    console.log('Encripting error');
    next(error);
  }

})

module.exports = mongoose.model('User', UserSchema);