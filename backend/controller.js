
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

exports.login = async (req, res) => { //login for the app
    //CHANGE THE IMPLEMENTATION OF THIS
    console.log("LOGIN BACKEND")
    console.log("input:" +req.body)
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

    var loginCredentials = { //login credentials to be used by cookies jwt
        issuer : "capuPOSapp", //the issuer is this software organization
        subject: email, //the subject is the user's email
        audience: "http://localhost:3000", //verify this 
        expiresIn: "24h",
        algorithm: "RS256" // to emphasize that the program uses private/public keys
    };
    
	if (!user) { //there is no such user
        MESSAGE = "Invalid email";
		return res.json({ status: 'error', error: 'Invalid email' })
	}

	if (await bcrypt.compare(password, user.password)) {
	// the username, password combination is successful

		const token = jwt.sign(
			{ //payload
				id: user._id,
				username: user.username,
                email: user.email,
                role: user.role
			},
			privateKey, //refer to private.key
            loginCredentials //this is how the client proves its identity
		)
        console.log("TOKEN: "+ token)
        MESSAGE="logged in successfully"
		return res.json({ status: 'ok', token: token }) //the response will be sending data: token to axios which will then save it in the local storage
	}
    MESSAGE = "Invalid password"; //user exist but wrong password
	res.json({ status: 'error', error: 'Invalid username/password' })
}

exports.setUpAccount = async (req, res) =>{ //setup the account
    console.log("SET UP INITIAL ACCOUNT")
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
    if (!err) { //id successfully saved

        var loginCredentials = { //login credentials to be used by cookies jwt
            issuer : "capuPOSapp", //the issuer is this software organization
            subject: req.body.email, //the subject is the user's email
            audience: "http://localhost:3000", //verify this 
            expiresIn: "24h",
            algorithm: "RS256" // to emphasize that the program uses private/public keys
        };
    
        const token = jwt.sign(
            { //payload
                //id: user._id,
                username: req.body.username,
                email: req.body.email, //email used here is assumed to be work email, and not personal email for security purposes
                role: req.body.role    //it will serve as the unique identifier for our db
            },
            privateKey, //refer to private.key
            loginCredentials //this is how the client proves its identity
        )
        console.log("TOKEN: "+ token)
        return res.json({ status: 'valid', token: token })

    }else if(err.code === 11000){ //check whether an email has been used
        return res.json({ status: 'error', error: 'email already in use' })
    }else{ //this is a prompt for duplicate key 
        console.log("there is an error") 
        return res.json({status: 'error'})
    }
    })
}

exports.addUser = async (req, res) => {
//insert set up account commands
}

exports.editUser = async (req, res) => {
//insert edit user commands
}

exports.editUserDatabase = async (req, res) => {
//insert edit user database commands
}


