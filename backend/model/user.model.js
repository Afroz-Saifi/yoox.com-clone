const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, unique: false },
    last_name: { type: String, required: true, unique: false },
    email: { type: String, unique: true },
    password: { type: String, required: true, unique: false },
    gender: { type: String, required: true, unique: false },
    dob: { type: Date, required: true, unique: false },
    phone: { type: Number, required: true, unique: true },
    verify:Boolean
  },
  { versionKey: false, timestamps: true }
);

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
