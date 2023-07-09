const express = require("express");
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger/swagger');
require("dotenv").config();
const cors = require("cors");
const { connectDb } = require("./db");
const { userRouter } = require("./routes/user.route");
const { authCheck } = require("./middleware/authentication");
const { productsRouter } = require("./routes/products.route");
const { bagRouter } = require("./routes/bag.router");

const app = express();
app.use(cors());
app.use(express.json());

// documentations
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use("/users", userRouter);
app.use("/products", productsRouter);
app.use(authCheck);
app.use("/bag", bagRouter);

app.listen(process.env.port, () => {
  console.log(`server running on port ${process.env.port}`);
  try {
    connectDb(process.env.mongoUrl);
    console.log("connectd to db");
  } catch (error) {
    console.log(error);
  }
});
