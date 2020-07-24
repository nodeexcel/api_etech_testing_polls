var mongoose = require("mongoose");

var polls = mongoose.Schema(
  {},
  {
    strict: false,
    collection: "polls",
  }
);
module.exports = mongoose.model("polls", polls);
