var mongoose = require('mongoose');

module.exports = function (mongoose) {

    var conn = mongoose.createConnection('mongodb: //localhost/etech_testing_api');
    
    
    var users = mongoose.Schema({}, {
        strict: false,
        collection: 'users'
    });
    var table_users = conn.model('users', users);
    
    
    console.log( table_users );
    

    return function (req, res, next) {
        req.table_users = table_users;
        next();
    }
}
