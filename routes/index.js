var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var auth = require("../middleware/auth");
const userController = require("../dbController/userController");
const pollController = require("../dbController/pollController");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/adduser", userController.addUser);

router.post("/login", userController.login);

router.get("/list_users",userController.listUser)

router.post("/add_poll",pollController.addPoll )

router.get("/list_polls", pollController.listPolls)

router.get("/list_poll", pollController.listPoll) 

router.post("/do_vote",auth.validateAccess,pollController.doVote)

//  function (req, res, next) {
//   var id = req.query.id;
//   var option_text = req.query.option_text;
//   var voted_users = [];
//   auth.validateAccess(req, function (err, access_token_data) {
//     if (err) {
//       res.status(402).json({ error: 1 });
//     } else {
//       var users_id = access_token_data.user_id;
//       table_polls
//         .findOne({
//           _id: id,
//         })
//         .exec(function (err, poll) {
//           if (err) {
//             next(err);
//           } else {
//             if (poll) {
//               poll_options = poll.get("options");
//               var new_options = [];
//               voted_users = poll.get("ids");
//               flag = 0;
//               for (var k in voted_users) {
//                 if (voted_users[k].id == users_id) {
//                   flag = 1;
//                   if (option_text == voted_users[k].opt) {
//                     for (var k in poll_options) {
//                       new_options.push(poll_options[k]);
//                     }
//                   } else {
//                     var old_vote = voted_users[k].opt;
//                     for (var a in poll_options) {
//                       opt = poll_options[a];
//                       if (opt.option == old_vote) {
//                         opt.vote = opt.vote - 1;
//                       } else if (opt.option == option_text) {
//                         opt.vote = opt.vote + 1;
//                         voted_users[k].opt = option_text;
//                       }
//                       new_options.push(opt);
//                     }
//                   }
//                   if (flag == 1) {
//                     break;
//                   }
//                 } else {
//                   flag = 0;
//                 }
//               }
//               if (flag == 0) {
//                 for (var c in poll_options) {
//                   opt = poll_options[c];
//                   if (opt.option == option_text) {
//                     opt.vote = opt.vote + 1;
//                   }
//                   new_options.push(opt);
//                 }
//                 voted_users.push({
//                   id: users_id,
//                   opt: option_text,
//                 });
//               }

//               table_polls.update(
//                 {
//                   _id: id,
//                 },
//                 {
//                   $set: {
//                     options: new_options,
//                     ids: voted_users,
//                   },
//                 },
//                 function (err) {
//                   if (err) {
//                     res.json({
//                       error: 1,
//                     });
//                   } else {
//                     res.json({
//                       error: 0,
//                     });
//                   }
//                 }
//               );
//             } else {
//               res.json({
//                 error: 1,
//                 data: "poll not found",
//               });
//             }
//           }
//         });
//     }
//   });
// });

router.all("/add_new_option", function (req, res, next) {
  var id = req.query.id;
  var option_text = req.query.option_text;
  table_polls
    .findOne({
      _id: id,
    })
    .exec(function (err, poll) {
      if (err) {
        next(err);
      } else {
        if (poll) {
          poll_options = poll.get("options");
          var new_options = poll_options;
          new_options.push({
            vote: 0 * 1,
            option: option_text,
          });
          table_polls.update(
            {
              _id: id,
            },
            {
              $set: {
                options: new_options,
              },
            },
            function (err) {
              if (err) {
                res.json({
                  error: 1,
                });
              } else {
                res.json({
                  error: 0,
                });
              }
            }
          );
        } else {
          res.json({
            error: 1,
            data: "poll not found",
          });
        }
      }
    });
});

router.all("/delete_poll_option", function (req, res, next) {
  var id = req.query.id;
  var option_text = req.query.option_text;
  table_polls
    .findOne({
      _id: id,
    })
    .exec(function (err, poll) {
      if (err) {
        next(err);
      } else {
        if (poll) {
          poll_options = poll.get("options");
          var new_options = [];
          for (var k in poll_options) {
            opt = poll_options[k];
            if (opt.option == option_text) {
            } else {
              new_options.push(opt);
            }
          }
          table_polls.update(
            {
              _id: id,
            },
            {
              $set: {
                options: new_options,
              },
            },
            function (err) {
              if (err) {
                res.json({
                  error: 1,
                });
              } else {
                res.json({
                  error: 0,
                });
              }
            }
          );
        } else {
          res.json({
            error: 1,
            data: "poll not found",
          });
        }
      }
    });
});

router.all("/update_poll_title", function (req, res, next) {
  var id = req.query.id;
  var new_title = req.query.title;
  table_polls
    .findOne({
      _id: id,
    })
    .exec(function (err, poll) {
      if (err) {
        next(err);
      } else {
        if (poll) {
          table_polls.update(
            {
              _id: id,
            },
            {
              $set: {
                title: new_title,
              },
            },
            function (err) {
              if (err) {
                res.json({
                  error: 1,
                });
              } else {
                res.json({
                  error: 0,
                });
              }
            }
          );
        } else {
          res.json({
            error: 1,
            data: "poll not found",
          });
        }
      }
    });
});

router.all("/delete_poll", function (req, res, next) {
  var id = req.query.id;
  table_polls
    .findOne({
      _id: id,
    })
    .exec(function (err, poll) {
      if (err) {
        next(err);
      } else {
        if (poll) {
          table_polls.remove(
            {
              _id: id,
            },
            function (err) {
              if (err) {
                res.json({
                  error: 1,
                });
              } else {
                res.json({
                  error: 0,
                });
              }
            }
          );
        } else {
          res.json({
            error: 1,
            data: "poll not found",
          });
        }
      }
    });
});

router.all("/update_poll_option", function (req, res, next) {
  var id = req.query.id;
  var old_option = req.query.old_option;
  var option_text = req.query.option_text;
  table_polls
    .findOne({
      _id: id,
    })
    .exec(function (err, poll) {
      if (err) {
        next(err);
      } else {
        if (poll) {
          poll_options = poll.get("options");
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
          table_polls.update(
            {
              _id: id,
            },
            {
              $set: {
                options: new_options,
              },
            },
            function (err, data) {
              if (err) {
                res.json({
                  error: 1,
                });
              } else {
                res.json({
                  error: 0,
                });
              }
            }
          );
        } else {
          res.json({
            error: 1,
            data: "poll not found",
          });
        }
      }
    });
});

module.exports = router;
