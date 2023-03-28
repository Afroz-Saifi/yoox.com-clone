const bcrypt = require("bcryptjs");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const hashPass = bcrypt.hashSync(`${req.body.password}`, 8);
  req.body.password = hashPass;
  try {
    const userData = new userModel(req.body);
    await userData.save();
    return res.status(201).json({ msg: "user registered successfully" });
  } catch (error) {
    return res.status(400).json({ err: error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await userModel.findOne({ email });
    if (data) {
      let checker = bcrypt.compareSync(password, data.password);
      if (checker) {
        return res.status(200).json({
          msg: "login successfull",
          token: jwt.sign({ userId: data._id }, process.env.secretKey, {
            expiresIn: "3h",
          }),
        });
      } else {
        return res.status(400).send({ msg: "wrong password" });
      }
    } else {
      return res.status(400).json({ msg: "invalid email" });
    }
  } catch (error) {
    return res.status(404).json({ err: error });
  }
};

module.exports = { registerUser, loginUser };
