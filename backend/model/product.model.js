const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    image: String,
    brand: String,
    microcategory: String,
    oldprice: String,
    off: String,
    newprice: Number,
    category: String,
    size: String,
  },
  { versionKey: false, timestamps: true }
);

const productModel = mongoose.model("products", productSchema);

module.exports = { productModel };
