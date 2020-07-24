var user = require("../Model/userModel");
var poll = require("../Model/pollModel");
const utils = require("../commonFunction/utils");

module.exports = {
  addUser: async (req, res) => {
    const data = await user.addUser(req.body, res);
    try {
      res
        .status(utils.Success_Code.Success)
        .send(utils.Success_Message.SignUp_Successfully);
    } catch (error) {
      res
        .status(
          utils.Error_Code.Internal_Error,
          utils.Error_Message.InternalError
        )
        .send(utils.Error_Message.InternalError);
    }
  },
};
