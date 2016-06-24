var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
var conn = mongoose.createConnection('mongodb://localhost/test');
var users = mongoose.Schema({}, {
    strict: false,
    collection: 'users'
});
var table_users = conn.model('users', users);


router.all('/add_user', function (req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    var role = req.query.role;
    
    var UserModel = req.table_users;

    var userObj = {
        username : username,
        password : password,
        role : role
    };

    table_users.findOne({
        username : username
    }).exec(function (err, user) {
            if (err) {
                next(err);
            } else {
                if (user) {
                    res.json({
                        error: 1,
                        message: 'Account Already Exists!'
                    });
                } else {
                    var model = new table_users(userObj);
                    model.save(function (err) {
                        if (err) {
                            next(err);
                        } else {
                            var id = model._id;
                            userObj.id = id;
                            res.json({
                                error: 0,
                                data: userObj
                            });
                        }
                    });
                }
            }
        });
});

router.all('/login', function (req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    
    var UserModel = req.table_users;

    var userObj = {
        username : username,
        password : password,
    };

    table_users.findOne({
        username : username,
        password : password
    }).exec(function (err, user) {
            if (err) {
                next(err);
            } else {
                if (user) {
                    res.json({
                        error: 0,
                        data : user
                    });
                } else {
                    res.json({
                        error: 1,
                        data : 'user not exists'
                    });
                }
            }
        });
});

router.all('/list_users', function (req, res, next) {
    table_users.find({
    }).exec(function (err, users) {
            if (err) {
                next(err);
            } else {
                if (users) {
                    res.json({
                        error: 0,
                        data : users
                    });
                } else {
                    res.json({
                        error: 1,
                        data : 'no user found'
                    });
                }
            }
        });
});


module.exports = router;
