`--unhandled-rejections=strict`;
var polls = require("../Model/pollModel");
const utils = require("../commonFunction/utils");
var auth = require("../middleware/auth");

module.exports = {
  addPoll: async (req, res) => {
    try {
      const saved = await polls.Addpoll(req.body, res);
      res.status(utils.Success_Code.Success).json({
        saved,
      });
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },

  listPolls: async (req, res) => {
    try {
      const poll = await polls.find({});
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
    try {
      const result = await polls.ListPoll(req.query, res);
      if (result == null) {
        res.status(utils.Error_Code.NotFound).send(utils.Error_Message.NoData);
      } else {
        res.status(utils.Success_Code.Success).json({
          result,
        });
      }
    } catch (error) {
      res
        .status(utils.Error_Code.Internal_Error)
        .send(utils.Error_Message.InternalError);
    }
  },
  doVote: async (req, res) => {
    try {
      const vote = await polls.DoVote(req.body);
      if (vote == 0) {
        res.status(utils.Success_Code.Success).json({
          error: 0,
        });
      } else {
        res.status(utils.Success_Code.Success).json({
          error: 1,
        });
      }
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
  addNewOpt: async (req, res) => {
    try {
      await polls.newOpt(req.body);
      res.status(utils.Success_Code.Success).send(utils.Success_Message.OptAdd);
    } catch (error) {
      res.status(error.status).send({
        result: error.message,
      });
    }
  },
  delOpt: async (req, res) => {
    try {
      await polls.delOption(req.body);
      res
        .status(utils.Success_Code.Success)
        .send(utils.Success_Message.Deleted);
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
  updatePollTitle: async (req, res) => {
    try {
      await polls.updateTitle(req.body);
      res.status(utils.Success_Code.Success).send(utils.Success_Message.Update);
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
  deletePoll: async (req, res) => {
    try {
      await polls.delPoll(req.query);
      res
        .status(utils.Success_Code.Success)
        .send(utils.Success_Message.Deleted);
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
  updatePollOption: async (req, res) => {
    try {
      await polls.updateOption(req.body);
      res.status(utils.Success_Code.Success).send(utils.Success_Message.Update);
    } catch (error) {
      res.status(error.status).send(error.message);
    }
  },
};
