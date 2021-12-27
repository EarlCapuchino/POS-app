
const mongoose = require('mongoose');
//connection to database
mongoose.connect('mongodb+srv://pos-app-admin:cmsc100ef1l@clusterpos.v5vmf.mongodb.net/pos-app-collection?retryWrites=true&w=majority',  { useNewUrlParser: true }, {useUnifiedTopology: true})

//database models and schema
const {User} = require('./models/user')
const {Product} = require('./models/product')
const {Transaction} = require('./models/transaction')

exports.homepage =  (req, res) =>{ //hompage scree, will check iof there are existing users or none
    console.log("HOMEPAGE")

    User.findOne((err, users) => { //check if a user exists, //if no user, go to setup account //if there are users 
        if (users!=null){ 
            console.log("user exist")
            return res.send({status: "existent"}) //with users, proceed to login
        }
        else{
            console.log("no users")
            return res.send({status: "empty"}) //no users, proceed to set up inital account withy the user being the admin
        }
    });


}
