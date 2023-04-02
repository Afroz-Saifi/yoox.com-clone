const { bagModel } = require("../model/bag.model");
const jwt = require("jsonwebtoken");

const add_to_bag = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "fw24_605");
  req.body.userId = decoded.userId;
  const bag_data = new bagModel(req.body);
  try {
    await bag_data.save();
    return res.status(201).json({ success: "added to cart successfully" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const get_bags = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "fw24_605");
  const userId = decoded.userId;
  try {
    const bags_data = await bagModel.find({ userId: userId });
    if (bags_data.length == 0) {
      return res.status(404).json({ not_avail: "no products available" });
    }
    return res.status(200).json(bags_data);
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};
const delete_bag = async (req, res) => {
  try {
    await bagModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ msg: "removed form bag" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

module.exports = { add_to_bag, get_bags, delete_bag };
