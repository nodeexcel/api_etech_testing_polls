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
        let err = new Error("UserName Already Exist.")
        err.status= utils.Error_Code.AlreadyExist
        throw err;
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
          let err = new Error("UserName Already Exist.")
        err.status= utils.Error_Code.NotMatch
        throw err;
        }
      } else {
        let err = new Error("User doesnot Exist.")
        err.status= utils.Error_Code.NotFound
        throw err;
      }
    } catch (error) {
      throw error;
    }
  }),
  (module.exports = userModel);
