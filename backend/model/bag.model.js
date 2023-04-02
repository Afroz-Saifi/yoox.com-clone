const mongoose = require("mongoose");

const bagSchema = new mongoose.Schema(
  {
    image: String,
    brand: String,
    microcategory: String,
    oldprice: String,
    off: String,
    newprice: Number,
    category: String,
    size: String,
    userId: String,
  },
  { versionKey: false, timestamps: true }
);

const bagModel = mongoose.model("bags", bagSchema);

module.exports = { bagModel };
