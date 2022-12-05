const mongoose = require('mongoose');


const schema = mongoose.Schema({}, {
    strict: false,
    collection: 'polls'
});

module.exports = mongoose.model("polls", schema)