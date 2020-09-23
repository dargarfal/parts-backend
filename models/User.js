const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  fulluserName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String
  },
  userPass: {
    type: String,
    required: true,
    trim: true,
  },
  userRole: {
    type: String,
    enum: ["administrador", "usuario"],
  },
  userSales: [
    {
      type: Schema.Types.ObjectId,
      ref: "Sale",
    },
  ],
  userEnable: {
    type: Boolean,
    default: true
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

//Executing the crypt before the method is executed save()
UserSchema.pre("save", async function (next) {
  try {
    const salts = await bcrypt.genSalt(10);
    this.userPass = await bcrypt.hash(this.userPass, salts);
    next();
  } catch (error) {
    console.log("Encripting error");
    next(error);
  }
  const salts = await bcrypt.genSalt(10);
});

module.exports = mongoose.model("User", UserSchema);
