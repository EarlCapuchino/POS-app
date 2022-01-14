const mongoose = require('mongoose');
const Session = mongoose.model('Session', { //structure of the user when logging in and out (the session)
    username: String,
    email: String,
    login: String,
    logout: String
})

module.exports = {Session}