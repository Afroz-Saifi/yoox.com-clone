const { productModel } = require("../model/product.model");

const getAllProcucts = async (req, res) => {
  const { page, sort } = req.query;
  const pageNo = (page - 1) * 18;
  const min = req.query.min || -Infinity;
  const max = req.query.max || Infinity;
  const brands = req.query.brands || "";
  let categories = req.query.cats || "";
  let brandies = brands
    .split(" ")
    .map((ele) => ({ brand: { $regex: `${ele}` } }));
  let cats = categories
    .split(",")
    .map((ele) => ({ microcategory: { $regex: `${ele}` } }));
  let sortFilter = {};
  if (sort) {
    sortFilter.newprice = sort;
  }
  let filter = {
    $and: [
      { newprice: { $lt: max } },
      { newprice: { $gt: min } },
      { $and: [{ $or: brandies }, { $or: cats }] },
    ],
  };

  try {
    const productsData = await productModel
      .find(filter)
      .sort(sortFilter)
      .skip(pageNo)
      .limit(18);
    if (productsData.length == 0) {
      return res.status(404).json({ msg: "products not found" });
    } else {
      return res.status(200).json(productsData);
    }
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const getSoloProcuct = async (req, res) => {
  const { id } = req.params;
  try {
    const solo_data = await productModel.findById(id);
    return res.status(200).json(solo_data);
  } catch (error) {
    return res.status(404).json({ err: "product not found" });
  }
};

module.exports = { getAllProcucts, getSoloProcuct };
