const express = require("express");
const { getAllProcucts, getSoloProcuct } = require("../controller/product.controller");

const productsRouter = express.Router();

productsRouter.get("/", getAllProcucts);
productsRouter.get("/:id", getSoloProcuct);

module.exports = { productsRouter };
