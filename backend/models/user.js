const mongoose = require('mongoose');
const User = mongoose.model('User', {
    username: { //user identifications
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,

    },
    role:{ //Admin, staff, cashier
        type: String,
        required: true
    } 
})

module.exports = {User}