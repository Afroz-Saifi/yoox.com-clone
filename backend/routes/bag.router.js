const express = require("express");
const {
  add_to_bag,
  get_bags,
  delete_bag,
} = require("../controller/bag.controller");

const bagRouter = express.Router();

bagRouter.post("/add", add_to_bag);
bagRouter.get("/", get_bags);
bagRouter.delete("/delete/:id", delete_bag);

module.exports = { bagRouter };
