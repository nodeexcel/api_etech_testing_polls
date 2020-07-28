const user = require("../Model/userModel");
const utils = require("../commonFunction/utils");
var bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  addUser: async (req, res) => {
    await user.AddUser(req.body, res);
    try {
      const saltround = 10;
      var Hash = await bcrypt.hash(req.body.password, saltround);
      req.body.password = Hash;
      const data = await new user(req.body).save();
      res.status(utils.Success_Code.Success).json({ data });
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  login: async (req, res) => {
    await user.Login(req.body, res);
    try {
      const token = jwt.sign({ username: req.body.username }, "jwt_tok", {
        expiresIn: 86400,
      });
      res.status(utils.Success_Code.Success, utils.Success_Message.Login).json({
        Token: token,
      });
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  listUser: async (req, res) => {
    var data = await user.find();
    try {
     res.status(utils.Success_Code.Success).send(data);
    } catch {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
};
