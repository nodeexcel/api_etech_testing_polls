var mongoose = require("mongoose");
const utils = require("../commonFunction/utils");
const bcrypt = require("bcrypt");

var users = mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "users",
  }
);
var userModel = mongoose.model("users", users);

(userModel["AddUser"] = async (body, res) => {
  try {
    const fetch = await userModel.findOne({ username: body.username });
    if (fetch) {
      if (fetch.username == body.username) {
        return res
          .status(utils.Error_Code.AlreadyExist)
          .send(utils.Error_Message.NameExist);
      }
    }
  } catch (err) {
    throw err;
  }
}),
  (userModel["Login"] = async (body, res) => {
    try {
      var fetch = await userModel.findOne({ username: body.username });
      if (fetch) {
        var hash = fetch.password;
        var pass = await bcrypt.compare(body.password, hash);
        if (pass == false) {
          res
            .status(utils.Error_Code.NotMatch)
            .send(utils.Error_Message.InvalidLogin);
        }
      } else {
        res
          .status(utils.Error_Code.NotFound)
          .send(utils.Error_Message.NotExist);
      }
    } catch (error) {
      throw error;
    }
  }),
  (module.exports = userModel);
