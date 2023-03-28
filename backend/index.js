const express = require("express");
require("dotenv").config();
const { connectDb } = require("./db");
const { userRouter } = require("./routes/user.route");
const { authCheck } = require("./middleware/authentication");
const cors = require('cors')

const app = express();
app.use(cors())
app.use(express.json());

app.use("/users", userRouter);
app.use(authCheck);

app.listen(process.env.port, () => {
  console.log(`server running on port ${process.env.port}`);
  try {
    connectDb(process.env.mongoUrl);
    console.log("connectd to db");
  } catch (error) {
    console.log(error);
  }
});
