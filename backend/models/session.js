const mongoose = require('mongoose');
const Session = mongoose.model('Session', {
    username: String,
    email: String,
    login: String,
    logout: String
})

module.exports = {Session}