const mongoose = require('mongoose');


const schema = mongoose.Schema({}, {
    strict: false,
    collection: 'users'
});

module.exports = mongoose.model("users", schema)