var mongoose = require("mongoose");
const utils = require("../commonFunction/utils");
const bcrypt = require("bcrypt")

var users = mongoose.Schema(
  {},
  {
    strict: false,
    collection: "users",
  }
);
const userModel = mongooose.model("users", users);

userModel["addUser"] = async (body, res) => {
  try {
    const fetch = userModel.findOne({ username: body.username });
    if (fetch) {
      res
        .status(utils.ErrorCode.AlreadyExist)
        .send(utils.Error_Message.NameExist);
    } else {
        hash = await bcrypt.hash(req.body.passowrd,10)
      var userObj = {
        username: req.body.username,
        password: hash,
        role: req.body.role,
      };
      var User = await new userModel(userObj).save();
      return User;
    }
  } catch (err) {}
};

module.exports = userModel;
