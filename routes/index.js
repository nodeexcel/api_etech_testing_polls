var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var auth = require("../middleware/auth");
const userController = require("../dbController/userController");
const pollController = require("../dbController/pollController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
  });
});

router.post("/adduser", userController.addUser);

router.post("/login", userController.login);

router.get("/list_users", userController.listUser);

router.post("/add_poll", pollController.addPoll);

router.get("/list_polls", pollController.listPolls);

router.get("/list_poll", pollController.listPoll);

router.post("/do_vote", auth.validateAccess, pollController.doVote);

router.post("/add_new_option", pollController.addNewOpt);

router.post("/delete_poll_option", pollController.delOpt);

router.post("/update_poll_title", pollController.updatePollTitle);

router.get("/delete_poll", pollController.deletePoll);

router.all("/update_poll_option",pollController.updatePollOption)
//   var id = req.query.id;
//   var old_option = req.query.old_option;
//   var option_text = req.query.option_text;
//   table_polls
//     .findOne({
//       _id: id,
//     })
//     .exec(function (err, poll) {
//       if (err) {
//         next(err);
//       } else {
//         if (poll) {
//           poll_options = poll.get("options");
//           var new_options = [];
//           for (var k in poll_options) {
//             opt = poll_options[k];
//             if (opt.option == old_option) {
//               opt.option = option_text;
//               new_options.push(opt);
//             } else {
//               new_options.push(opt);
//             }
//           }
//           table_polls.update(
//             {
//               _id: id,
//             },
//             {
//               $set: {
//                 options: new_options,
//               },
//             },
//             function (err, data) {
//               if (err) {
//                 res.json({
//                   error: 1,
//                 });
//               } else {
//                 res.json({
//                   error: 0,
//                 });
//               }
//             }
//           );
//         } else {
//           res.json({
//             error: 1,
//             data: "poll not found",
//           });
//         }
//       }
//     });
// });
module.exports = router;
