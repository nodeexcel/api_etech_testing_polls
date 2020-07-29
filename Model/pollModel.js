var mongoose = require("mongoose");
var auth = require("../middleware/auth");
var utils = require("../commonFunction/utils");

var polls = mongoose.Schema(
  {
    title: {
      type: String,
    },
    options: {
      type: Array,
    },
    date: {
      type: String,
    },
    ids: [],
  },
  {
    collection: "polls",
  }
);
const pollModel = mongoose.model("polls", polls);

pollModel.Addpoll = async (body) => {
  try {
    var date = Date.now();
    var ids = [];
    var final_options = [];
    split_options = body.options.split("____");
    date = new Date(date);
    for (var k in split_options) {
      kk = split_options[k];
      final_options.push({
        option: kk,
        vote: 0 * 1,
      });
    }
    var pollObj = {
      title: body.title,
      options: final_options,
      date: date,
      ids: ids,
    };
    var model = await new pollModel(pollObj).save();
    var id = model._id;
    pollObj.id = id;
    return pollObj;
  } catch (error) {
    throw error;
  }
};
pollModel.ListPoll = async (query, res) => {
  try {
    var id = query.id;
    const fetch = await pollModel.findOne({
      _id: id,
    });
    if (!fetch) {
      return null;
    } else {
      return fetch;
    }
  } catch (err) {
    throw err;
  }
};
pollModel.DoVote = async (body, res) => {
  try {
    var id = body.id;
    var option_text = body.option_text;
    var voted_users = [];
    var users_id = access_token_data;
    const poll = await pollModel.findOne({
      _id: id,
    });
    if (poll) {
      poll_options = poll.get("options");
      var new_options = [];
      voted_users = poll.get("ids");
      await voted_users.forEach((element) => {
        if (String(element.id) == String(users_id)) {
          return res
            .status(utils.Error_Code.AlreadyExist)
            .send(utils.Error_Message.IdExist);
        }
      });
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
          if (flag == 1) {
            break;
          }
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
          opt: option_text,
        });
        await pollModel.update(
          { _id: id },
          { $set: { options: new_options, ids: voted_users } }
        );
        return 0;
      }
    } else {
      res.json({
        data: "poll not found",
      });
    }
  } catch (err) {
    throw err;
  }
};

pollModel.newOpt = async (body, res) => {
  try {
    const option_text = body.option_text;
    const poll = await pollModel.findOne({ _id: body.id });
    if (poll) {
      const opt = await pollModel.findOne({
        $and: [{ _id: body.id }, { "options.option": body.option_text }],
      });
      console.log(opt);
      if (opt == null) {
        poll_options = poll.get("options");
        var new_options = poll_options;
        new_options.push({
          vote: 0 * 1,
          option: option_text,
        });
        const data = await pollModel.update(
          {
            _id: body.id,
          },
          {
            $set: {
              options: new_options,
            },
          }
        );
        return data;
      } else {
        return res.json({
          data: "option already exist",
        });
      }
    } else {
      res.json({
        error: 1,
        data: "poll not found",
      });
    }
  } catch (err) {
    res.json({
      error: err,
    });
  }
};
module.exports = pollModel;
