var jwt = require("jsonwebtoken");
var utils = require("../commonFunction/utils");
const uModel = require("../Model/userModel")

module.exports = {
  validateAccess: async (req, res ,next)=> {
 try {
        if (!req.headers.access_token) {
          res
            .status(utils.Error_Code.NotFound)
            .send(utils.Error_Message.Not_Found);
        } else {
          data = await jwt.verify(req.headers.access_token, "jwt_tok");
          var User = await uModel.findOne({
            username: data.username,
          });
          if (!data) {
            res
              .status(utils.Error_Code.NotFound)
              .send(utils.Error_Message.NotExist);
          } else {
            access_token_data = User._id
            next();
          }
        }
      } catch (error) {
        throw error;
      }
//     console.log("headrss");
//     const access_token_data = await jwt.verify(
//       req.headers.access_token,
//       "jwt_tok"
//     );
//     if (access_token_data==null) {
//       return null;
//     } else {
//       return access_token_data;
//     }
//   },
    }
}
