
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

exports.login = async (req, res) => {
//insert login commands
}

exports.setUpAccount = async (req, res) => {
//insert set up account commands
}

exports.addUser = async (req, res) => { //this function is for adding users
    console.log("Add user page") 
    console.log(req.body) 
    console.log(req.body.password)
    const pwd = req.body.password
    const password=(await (bcrypt.hash(pwd, 10)))
    
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: password,
        role: req.body.role
    })

    if (req.body.password.length < 8) { //if passwords are less than 8 characters
		return res.json({
			status: 'error', error: 'Password should be at least 8 characters'
		})
	}

    newUser.save((err) => {
    if (!err) {
       res.send({status: 'ok'})
    }else if(err.code === 11000){
        return res.json({ status: 'error', error: 'email already in use' })
    }else{ //this is a prompt for duplicate key 
        console.log("there is an error") 
        throw err
    }
    })

}

exports.editUser = async = (req, res) =>{ //catch the errors
    console.log("Editing Users Page") //the password should not be displayed
    User.find((err, users) => {
        console.log(users)
        if (!err) { res.send(users) }
        else{return res.json( {status:"error",error: "no users to edit"} )} 
      })
}

exports.editUserDatabase = async =(req,res) =>{
console.log("EDIT user in DATA BASE")

const chosenName = req.body.chosenName //recording previous roles and assignment
const chosenRole = req.body.chosenRole //of new roles to be updated in the data base
const previousRole = req.body.previousRole

User.countDocuments({role: 'Admin'}, function(err, count) {
//count will represent the number of admins

    if ((count==1) && (previousRole == "Admin") && (chosenRole != "Admin")) {//checking if the sole admin will remove their admin status
        console.log("there should be at least one admin!")
        return res.json( {status: 'error', error: 'There should be atleast one admin!'})

    } else{ //if there are no errors, proceed here
        User.findOneAndUpdate(
            {username: chosenName},  //find the username
            { role: chosenRole,
            },function(err, res) {
                if (err){
                    console.log("ERROR UPDATE")
                }else{
                console.log("Role successfully changed!");
                }
            })
    }
})


}


