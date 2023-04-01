const express = require("express");
const { getAllProcucts } = require("../controller/product.controller");

const productsRouter = express.Router();

productsRouter.get("/", getAllProcucts);

module.exports = { productsRouter };
