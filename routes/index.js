var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var auth = require('../middleware/auth');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


var mongoose = require('mongoose');
var conn = mongoose.connect('mongodb://ashutosh_m:java123@ds251245.mlab.com:51245/etech_testing_polls');
var users = mongoose.Schema({}, {
    strict: false,
    collection: 'users'
});
var table_users = conn.model('users', users);

var polls = mongoose.Schema({}, {
    strict: false,
    collection: 'polls'
});
var table_polls = conn.model('polls', polls);


router.all('/add_user', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;
    var role = req.query.role;

    var userObj = {
        username: username,
        password: password,
        role: role
    };

    table_users.findOne({
        username: username
    }).exec(function(err, user) {
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
                model.save(function(err) {
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

router.all('/login', function(req, res, next) {
    var username = req.query.username;
    var password = req.query.password;

    var userObj = {
        username: username,
        password: password,
    };

    table_users.findOne({
        username: username,
        password: password
    }).exec(function(err, user) {
        if (err) {
            next(err);
        } else {
            if (user) {
                user = JSON.parse(JSON.stringify(user))
                delete user.password
                var token = jwt.sign(user, "jwt_tok", {
                    expiresIn: 3600000
                });
                res.json({
                    error: 0,
                    token: token
                });
            } else {
                res.json({
                    error: 1,
                    data: 'user not exists'
                });
            }
        }
    });
});

router.all('/list_users', function(req, res, next) {
    table_users.find({}).exec(function(err, users) {
        if (err) {
            next(err);
        } else {
            if (users) {
                res.json({
                    error: 0,
                    data: users
                });
            } else {
                res.json({
                    error: 1,
                    data: 'no user found'
                });
            }
        }
    });
});


router.all('/add_poll', function(req, res, next) {
    var title = req.query.title;
    var options = req.query.options;
    var date = req.query.date;
    var ids = []
    var final_options = [];
    split_options = options.split('____');
    date = new Date(date);
    for (var k in split_options) {
        kk = split_options[k];
        final_options.push({
            option: kk,
            vote: 0 * 1
        })
    }

    var pollObj = {
        title: title,
        options: final_options,
        date: date,
        ids: ids
    };


    var model = new table_polls(pollObj);
    model.save(function(err) {
        if (err) {
            next(err);
        } else {
            var id = model._id;
            pollObj.id = id;
            res.json({
                error: 0,
                data: pollObj
            });
            console.log(pollObj.options)
        }

    });

});

router.all('/list_polls', function(req, res, next) {
    table_polls.find({}).exec(function(err, polls) {
        if (err) {
            next(err);
        } else {
            if (polls) {
                res.json({
                    error: 0,
                    data: polls
                });
            } else {
                res.json({
                    error: 1,
                    data: 'no poll found'
                });
            }
        }
    });
});



router.all('/list_poll', function(req, res, next) {
    var id = req.query.id;
    table_polls.findOne({
        '_id': id
    }).exec(function(err, poll) {
        if (err) {
            next(err);
        } else {
            if (poll) {
                res.json({
                    error: 0,
                    data: poll
                });
            } else {
                res.json({
                    error: 1,
                    data: 'poll not found'
                });
            }
        }
    });
});



router.all('/do_vote', function(req, res, next) {
    var id = req.query.id;
    var option_text = req.query.option_text;
    var voted_users = [];
    auth.validateAccess(req, function(err, access_token_data) {
        if (err) {
            res.status(402).json({ error: 1 });
        } else {
            var users_id = access_token_data.user_id;
            table_polls.findOne({
                '_id': id
            }).exec(function(err, poll) {
                if (err) {
                    next(err);
                } else {
                    if (poll) {
                        poll_options = poll.get('options');
                        var new_options = [];
                        voted_users = poll.get('ids');
                        flag = 0;
                        for (var k in voted_users) {
                            if (voted_users[k].id == users_id) {
                                flag = 1;
                                if (option_text == voted_users[k].opt) {
                                    for (var k in poll_options) {
                                        new_options.push(poll_options[k]);
                                    }
                                } else {
                                    var old_vote = voted_users[k].opt;
                                    for (var a in poll_options) {
                                        opt = poll_options[a];
                                        if (opt.option == old_vote) {
                                            opt.vote = opt.vote - 1;
                                        } else if (opt.option == option_text) {
                                            opt.vote = opt.vote + 1;
                                            voted_users[k].opt = option_text;
                                        }
                                        new_options.push(opt);
                                    }
                                }
                                if (flag == 1) { break; }
                            } else {
                                flag = 0;
                            }
                        }
                        if (flag == 0) {
                            for (var c in poll_options) {
                                opt = poll_options[c];
                                if (opt.option == option_text) {
                                    opt.vote = opt.vote + 1;
                                }
                                new_options.push(opt);
                            }
                            voted_users.push({
                                id: users_id,
                                opt: option_text
                            })
                        }

                        table_polls.update({
                            _id: id
                        }, {
                            $set: {
                                options: new_options,
                                ids: voted_users
                            }
                        }, function(err) {
                            if (err) {
                                res.json({
                                    error: 1
                                });
                            } else {
                                res.json({
                                    error: 0
                                });
                            }
                        });

                    } else {
                        res.json({
                            error: 1,
                            data: 'poll not found'
                        });
                    }
                }
            })
        }
    })
});


router.all('/add_new_option', function(req, res, next) {
    var id = req.query.id;
    var option_text = req.query.option_text;
    table_polls.findOne({
        '_id': id
    }).exec(function(err, poll) {
        if (err) {
            next(err);
        } else {
            if (poll) {
                poll_options = poll.get('options');
                var new_options = poll_options;
                new_options.push({
                    vote: 0 * 1,
                    option: option_text
                })
                table_polls.update({
                    _id: id
                }, {
                    $set: {
                        options: new_options
                    }
                }, function(err) {
                    if (err) {
                        res.json({
                            error: 1
                        });
                    } else {
                        res.json({
                            error: 0
                        });
                    }
                });

            } else {
                res.json({
                    error: 1,
                    data: 'poll not found'
                });
            }
        }
    });
});



router.all('/delete_poll_option', function(req, res, next) {
    var id = req.query.id;
    var option_text = req.query.option_text;
    table_polls.findOne({
        '_id': id
    }).exec(function(err, poll) {
        if (err) {
            next(err);
        } else {
            if (poll) {
                poll_options = poll.get('options');
                var new_options = [];
                for (var k in poll_options) {
                    opt = poll_options[k];
                    if (opt.option == option_text) {

                    } else {
                        new_options.push(opt);
                    }
                }
                table_polls.update({
                    _id: id
                }, {
                    $set: {
                        options: new_options
                    }
                }, function(err) {
                    if (err) {
                        res.json({
                            error: 1
                        });
                    } else {
                        res.json({
                            error: 0
                        });
                    }
                });

            } else {
                res.json({
                    error: 1,
                    data: 'poll not found'
                });
            }
        }
    });
});


router.all('/update_poll_title', function(req, res, next) {
    var id = req.query.id;
    var new_title = req.query.title;
    table_polls.findOne({
        '_id': id
    }).exec(function(err, poll) {
        if (err) {
            next(err);
        } else {
            if (poll) {
                table_polls.update({
                    _id: id
                }, {
                    $set: {
                        title: new_title
                    }
                }, function(err) {
                    if (err) {
                        res.json({
                            error: 1
                        });
                    } else {
                        res.json({
                            error: 0
                        });
                    }
                });

            } else {
                res.json({
                    error: 1,
                    data: 'poll not found'
                });
            }
        }
    });
});


router.all('/delete_poll', function(req, res, next) {
    var id = req.query.id;
    table_polls.findOne({
        '_id': id
    }).exec(function(err, poll) {
        if (err) {
            next(err);
        } else {
            if (poll) {
                table_polls.remove({
                    _id: id
                }, function(err) {
                    if (err) {
                        res.json({
                            error: 1
                        });
                    } else {
                        res.json({
                            error: 0
                        });
                    }
                });

            } else {
                res.json({
                    error: 1,
                    data: 'poll not found'
                });
            }
        }
    });
});

router.all('/update_poll_option', function(req, res, next) {
    var id = req.query.id;
    var old_option = req.query.old_option;
    var option_text = req.query.option_text;
    table_polls.findOne({
        '_id': id
    }).exec(function(err, poll) {
        if (err) {
            next(err);
        } else {
            if (poll) {
                poll_options = poll.get('options');
                var new_options = [];
                for (var k in poll_options) {
                    opt = poll_options[k];
                    if (opt.option == old_option) {
                        opt.option = option_text;
                        new_options.push(opt);
                    } else {
                        new_options.push(opt);
                    }
                }
                table_polls.update({
                    _id: id
                }, {
                    $set: {
                        options: new_options
                    }
                }, function(err, data) {
                    if (err) {
                        res.json({
                            error: 1
                        });
                    } else {
                        res.json({
                            error: 0
                        });
                    }
                });
            } else {
                res.json({
                    error: 1,
                    data: 'poll not found'
                });
            }
        }
    });
});

module.exports = router;