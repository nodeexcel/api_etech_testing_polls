const user = require("../Model/userModel");
const utils = require("../commonFunction/utils");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  addUser: async (req, res) => {
    try {
      await user.AddUser(req.body);
      const saltround = 10;
      var Hash = await bcrypt.hash(req.body.password, saltround);
      req.body.password = Hash;
      const data = await new user(req.body).save();
      res.status(utils.Success_Code.Success).json({ data });
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
  login: async (req, res) => {
    try {
      await user.Login(req.body);
      const token = jwt.sign({ username: req.body.username }, "jwt_tok", {
        expiresIn: 86400,
      });
      res.status(utils.Success_Code.Success, utils.Success_Message.Login).json({
        Token: token,
      });
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
  listUser: async (req, res) => {
    var data = await user.find();
    try {
      res.status(utils.Success_Code.Success).send({ data });
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
};
