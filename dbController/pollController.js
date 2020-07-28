`--unhandled-rejections=strict`
var polls = require("../Model/pollModel");
const utils = require("../commonFunction/utils");
var auth = require("../middleware/auth");

module.exports = {
  addPoll: async (req, res) => {
    const saved = await polls.Addpoll(req.body, res);
    try {
      res.status(utils.Success_Code.Success).json({ saved });
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },

  listPolls: async (req, res) => {
    const poll = await polls.find({});
    try {
      res.json({
        data: poll,
      });
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  listPoll: async (req, res) => {
    const result = await polls.ListPoll(req.query, res);
    try {
      if (result == null) {
        res.status(utils.Error_Code.NotFound).send(utils.Error_Message.NoData);
      } else {
        res.status(utils.Success_Code.Success).json({ result });
      }
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  doVote: async (req, res) => {
    var vote = await polls.DoVote(req.body, res);
    console.log(vote)
    try {
      if (vote == 0) {
        res.status(utils.Success_Code.Success).json({ error: 0 });
      } else {
        res.status(utils.Success_Code.Success).json({ error: 1 });
      }
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
      
    }
  },
};
