
const mongoose = require('mongoose');
//connection to database
mongoose.connect('mongodb+srv://pos-app-admin:cmsc100ef1l@clusterpos.v5vmf.mongodb.net/pos-app-collection?retryWrites=true&w=majority',  { useNewUrlParser: true }, {useUnifiedTopology: true})

//database models and schema
const {User} = require('./models/user')
const {Product} = require('./models/product')
const {Transaction} = require('./models/transaction')

//cookies and security
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs');
var privateKey = fs.readFileSync('./keys/private.key','utf8'); //rsa keys 1024 bits
var publicKey = fs.readFileSync('./keys/public.key','utf8');

//prompts
let MESSAGE ='DEFAULT'
exports.homepage = async (req, res) => { //hompage scree, will check iof there are existing users or none
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

/////////////////////////// ACCOUNTS /////////////////////////////////////

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
        return res.json({ status: 'error', error: 'email is already in use' })
    }else{ //this is a prompt for duplicate key 
        console.log("there is an error") 
        return res.json({status: 'error'})
    }
    })
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
        MESSAGE = "Password should be atleast 8 characters" 
        res.send({status: 'invalid'})
	}

    newUser.save((err) => {
    if (!err) {
       MESSAGE = "User successfully added" 
       res.send({status: 'ok'})
    }else if(err.code === 11000){
        MESSAGE = "email already in use, please provide a new email"
        return res.send({ status: 'invalid'})
    }else{ //this is a prompt for duplicate key 
        MESSAGE = "User not added, there has been an error"
        return res.send({ status: 'invalid'})
    }
    })

}

exports.editUser = async (req, res) =>{ //catch the errors
    console.log("Editing Users Page") //the password should not be displayed
    User.find((err, users) => {
        console.log(users)
        if (!err) { res.send(users) }
        else{return res.json( {status:"error",error: "no users to edit"} )} 
      })
}

exports.editUserDatabase = async (req,res) =>{
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

/////////////////////////// PRODUCTS /////////////////////////////////////
exports.addItemInventory = (req, res) => {
  
    console.log("add item inventory=========");
    const token = req.body.cookies
    console.log(token)
 
    addProduct = (req, decoded) =>{
     const newProduct = new Product({
             name: req.body.name,
             price: req.body.price,
             stock: req.body.stock,
             addedBy: decoded.username
         })
       
         newProduct.save((err) => {
           if (!err) { 
               MESSAGE="Product successfully added on the list"
               res.json({status: "ok"})
             }
           else {
             MESSAGE= "Error in saving the product"
             res.json({status: "invalid"}) }
         })
     }
     
     //VERIFY FIRST IF LOGGED IN AND TOKENS ARE NOT TAMPERED
     if (token) {
         var decoded = jwt.decode(token, {complete: true});
         console.log("\n Docoded Token: " + JSON.stringify( decoded.payload.email));
        
         var verification = { //verification credentials
             issuer :  "capuPOSapp",
             subject:  decoded.payload.email, //checks the jwt's email property
             audience:"http://localhost:3000",
             maxAge: "24h",
             algorithms: ["RS256"] //refer to login credentials
         };
         jwt.verify(token, publicKey, verification, async (err, decoded) => {
           if (err) { //there might have been suspicious changes in the tokens
             MESSAGE = "Verification error" 
             return res.json({status:"invalid"})
           } else {
            
             console.log("\n Verified: " + JSON.stringify(decoded));// if decoded.role === "Admin"
             addProduct(req, decoded) //verification is successful 
           }
         });
       } else { //there are no tokens provided, not logged in
         MESSAGE = "Unauthorized access!" 
         return res.json({status:"error"})
       }
       //END OF VERIFICATION PROCESS
     
 }

 exports.viewInventory = (req, res, next) => {

    console.log('on view items')
    Product.find((err, products) => {
        if (!err) { res.send(products) } //sending the products on front-end
      })
   
}

exports.editItemInventory = (req, res, next) => {
    console.log("on edit items")
    console.log(req.body)
    const token = req.body.cookies

    editProduct = (req) => {

    Product.findOneAndUpdate(
        {_id: req.body.s_id}, 
        { name: req.body.s_name,
          price: req.body.s_price,
          stock: req.body.s_stock
        }, (err) =>{
            if (err){
                MESSAGE = "Error in editing"
                res.json({status:'invalid'})
            }else{
            console.log("1 document updated");
            MESSAGE = req.body.s_name + " sucessfully edited"
            res.json({status: 'ok'})
            }
        })
    }
    

       //VERIFY FIRST IF LOGGED IN AND TOKENS ARE NOT TAMPERED
       if (token) {
        var decoded = jwt.decode(token, {complete: true});
        console.log("\n Docoded Token: " + JSON.stringify( decoded.payload.email));
       
        var verification = { //verification credentials
            issuer :  "capuPOSapp",
            subject:  decoded.payload.email, //checks the jwt's email property
            audience:"http://localhost:3000",
            maxAge: "24h",
            algorithms: ["RS256"] //refer to login credentials
        };
        jwt.verify(token, publicKey, verification, async (err, decoded) => {
          if (err) { //there might have been suspicious changes in the tokens
            MESSAGE = "Verification error" 
            return res.json({status:"invalid"})
          } else {
            console.log("\n Verified: " + JSON.stringify(decoded));
            if (decoded.role == "Staff" ||decoded.role == "Admin" ){
                editProduct(req) //verification is successful 
            }
            
          }
        });
      } else { //there are no tokens provided, not logged in
        MESSAGE = "Unauthorized access!" 
        return res.json({status:"error"})
      }
      //END OF VERIFICATION PROCESS
   
}

exports.deleteProduct = (req,res) =>{

    console.log("=== Delete Product ====")
    console.log(req.body.deleteID);
    console.log(req.body.delName);

    deleteItem = (req) =>{
    Product.deleteOne({_id: req.body.deleteID},
        function(err, del){
            if (err){MESSAGE ="cannot delete "+ err.toString()
            res.json({status: "invalid"})
        }
            else{ MESSAGE = req.body.delName+ " successfully deleted"
            res.json({status:"ok"})}
        })
    }

    Transaction.findOne({'products': {$elemMatch: {productName: req.body.delName}}}, function (err, productName) {

        if (err){ //error in finding the product
            MESSAGE= "cannot delete the product, try again"
            return res.json({status: "invalid"});
        }    

        if (productName) { // the product cannot be deleted due to existing transactions
        MESSAGE = "cannot delete "+ req.body.delName +" the product has existing transactions already " 
        return res.json({status: "invalid"});
        }else{ //can be deleted
            MESSAGE = req.body.delName + " successfully deleted!"
            deleteItem(req);
        }

    });


}

/////////////////////////// TRANSACTIONS /////////////////////////////////////
exports.addTransaction =(req,res,next) => {
    //does not need any filter as 
    //any role can make transactions
    let token = req.body.cookies;
    let decoded = jwt.decode(token, {complete: true}); //decodes the token first
    console.log(decoded.payload.username)
    if (!decoded.payload){
        MESSAGE="Login credentials failed"
        return res.json({status: 'error'})
    }else{
        let vendor = decoded.payload.username
    

    let product =[]
    console.log(req.body.purchased.length)
    for (var i = 0; i< req.body.purchased.length;i++){
    //     //find ID
    //     //check if the stock is MORE THAN the quanitty demand
    //     //this will be modified in the front end
    //     //make sure that the max number of q in 
    //     //the respectic=ve html forms are limited
    //     //-> dont include

         var item={
             productID: req.body.purchased[i]._id,
             productName: req.body.purchased[i].name,
             productPrice: req.body.purchased[i].price,
             productQuantity: req.body.purchased[i].quantity,
         }
         
        Product.findOneAndUpdate( //find the ID and subtract the quantity in inventory
         {_id: item.productID},
         { $inc:{stock:-(item.productQuantity)}},
        {returnNewDocument: true}
       ).then(updatedDocument => {
        if(updatedDocument) {
         console.log("success")
        } else {
          console.log("No document matches the provided query.")
        }
        })
        .catch(err => console.error(`Failed to find and update document: ${err}`))
        product=[...product,item]
    }
        const newTransaction = new Transaction({ //new transaction created
            vendor: vendor,
            products: product,
            amountToBePaid: req.body.total,
            status: "paid"
        })
        console.log(newTransaction)
      
        newTransaction.save((err) => { //saved in the data base
          if (!err) { 
            MESSAGE="Transaction has been recorded" 
            return res.json({status: "ok"})
         }else {
         MESSAGE = err.toString()
         return res.json({status: "invalid"}) }
        })
        console.log("save")
    }
    
}

exports.viewTransactions = (req, res, next) => {
    console.log("on view transactions")
    Transaction.find((err, transactions) => {
        if (!err) { res.send(transactions) } 
      })
   
}

//prompts
exports.prompt = (req, res)=>{
    console.log("pumuntA")
    return res.json({status: MESSAGE})
}