var jwt = require('jsonwebtoken');
module.exports = {
    validateAccess: function(req, callback) {
        jwt.verify(req.headers.access_token, "jwt_tok", function(err, access_token_data) {
            if (err) {
                callback(err, "");
            } else {
                callback("", access_token_data);
            }
        });
    }
}