
const mongoose = require('mongoose');

//connection to database
const fileSync = require('fs');
const config =  fileSync.readFileSync('./config/dev.json','utf8');
const {mongodb: {username, password, host, database} } = JSON.parse(config)
mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`,  { useNewUrlParser: true }, {useUnifiedTopology: true})

//database models and schema
const {User} = require('./models/user')
const {Product} = require('./models/product')
const {Transaction} = require('./models/transaction')
const {Session} = require('./models/session')

//cookies and security
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fs = require('fs');
var privateKey = fs.readFileSync('./keys/private.key','utf8'); //rsa keys 1024 bits
var publicKey = fs.readFileSync('./keys/public.key','utf8');

//prompts
let MESSAGE ='DEFAULT'


exports.homepage = async (req, res) => { //hompage scree, will check if there are existing users or none
    User.findOne((err, users) => { //check if a user exists, //if no user, go to setup account //if there are users 
        if (users!=null){ 
            return res.send({status: "existent"}) //with users, proceed to login
        }
        else{
            return res.send({status: "empty"}) //no users, proceed to set up inital account withy the user being the admin
        }
    });
}



exports.dashboard = async (req,res)=>{
    
      //END OF VERIFICATION PROCESS
}

/////////////////////////// ACCOUNTS /////////////////////////////////////

exports.login = async (req, res) => { //login for the app
    //CHANGE THE IMPLEMENTATION OF THIS
	const { email, password } = req.body
	const user = await User.findOne({ email }).lean()

    var loginCredentials = { //login crenddentials to be used by cookies jwt
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

    let dateObj = new Date(); //get the dates credentials
    let date = ("0" + dateObj.getDate()).slice(-2);
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let year = dateObj.getFullYear();
    let hours = (dateObj.getHours())+8; //UTC + 8 for Philippine Standard Time
    let minutes = ("0" + dateObj.getMinutes()).slice(-2);
    let seconds = dateObj.getSeconds();
    let login = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
		const token = jwt.sign(
			{ //payload
				id: user._id,
				username: user.username,
                email: user.email,
                role: user.role,
                login: login
			},
			privateKey, //refer to private.key
            loginCredentials //this is how the client proves its identity
		)

        MESSAGE="logged in successfully"
		return res.json({ status: 'ok', token: token }) //the response will be sending data: token to axios which will then save it in the local storage
	}
    MESSAGE = "Invalid password"; //user exist but wrong password
	res.json({ status: 'error', error: 'Invalid username/password' })
}

exports.logout = async (req,res) =>{

    let token = req.body.cookies
    let decoded = jwt.decode(token, {complete: true});
    let dateObj = new Date(); //get the dates credentials
    let date = ("0" + dateObj.getDate()).slice(-2);
    let month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    let year = dateObj.getFullYear();
    let hours = (dateObj.getHours())+8; //UTC + 8 for Philippine Standard Time
    let minutes = ("0" + dateObj.getMinutes()).slice(-2);
    let seconds = dateObj.getSeconds();
    let logout = `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
    const newSession = new Session({
        username: decoded.payload.username,
        email: decoded.payload.email,
        login: decoded.payload.login,
        logout: logout
    })

    newSession.save((err) => {
        if (!err) { 
            res.json({status: "ok"})
          }
        else {
          MESSAGE= "Error in logging out"
          res.json({status: "invalid"}) }
      })
}

exports.setUpAccount = async (req, res) =>{ //setup the account
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
        return res.json({ status: 'valid', token: token })

    }else if(err.code === 11000){ //check whether an email has been used
        return res.json({ status: 'error', error: 'email is already in use' })
    }else{ //this is a prompt for duplicate key 
        return res.json({status: 'error'})
    }
    })
}



//TEMPLATE FOR FILTER
exports.addUser = async (req, res) => { //this function is for adding users

    const token = req.body.cookies
        var decoded = jwt.decode(token, {complete: true});

        
            if (decoded.payload.role == "Admin" ){//Checks if you are admin, then proceed, else, error
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
            }else{
                MESSAGE = "Unauthorized access! Admin only!" 
            return res.json({status:"error"})
            }
      //END OF VERIFICATION PROCESS
}


exports.editUser = async (req, res) =>{ //catch the errors
    User.find((err, users) => {
        if (!err) { 
            res.send(users) }
        else{return res.json( {status:"error",error: "no users to edit"} )} 
      })
}

exports.editUserDatabase = async (req,res) =>{

const chosenName = req.body.chosenName //recording previous roles and assignment
const chosenRole = req.body.chosenRole //of new roles to be updated in the data base
const previousRole = req.body.previousRole
const token = req.body.cookies


User.countDocuments({role: 'Admin'}, function(err, count) {
//count will represent the number of admins

    
    

            if ((count==1) && (previousRole == "Admin") && (chosenRole != "Admin")) {//checking if the sole admin will remove their admin status
                MESSAGE= "There should be at least one admin!"
                return res.json( {status: 'error', error: 'There should be atleast one admin!'})
        
            } else{ //if there are no errors, proceed here
                
            var decoded = jwt.decode(token, {complete: true});
            if (decoded.payload.role == "Admin" ){//Checks if you are admin, then proceed, else, error
                
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
                MESSAGE= "User role changed successfully!"
                return res.json( {status: 'ok', error: "User role changed successfully!"})    
           
            }else{
                MESSAGE = "Unauthorized access! Admin only!" 
            return res.json({status:"error"})
            }
                        
            }
})


}

//Change Password
exports.changePassword = async (req, res) => {
    const token = req.body.cookies
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword


    var decoded = jwt.decode(token, {complete: true});
   
    var verification = { //verification credentials
        issuer :  "capuPOSapp",
        subject:  decoded.payload.email, //checks the jwt's email property
        audience:"http://localhost:3000",
        maxAge: "24h",
        algorithms: ["RS256"] //refer to login credentials
    };

    var verified = jwt.verify(token, publicKey, verification);
    email = verified.email
	const user = await User.findOne({ email }).lean()
    if (await bcrypt.compare(oldPassword, user.password)) {
        if (newPassword.length < 8) { //if passwords are less than 8 characters
            MESSAGE= "new password should be atleast 8 characters"
            return res.json({
                status: 'error', error: 'Password should be at least 8 characters'
            })
        }else{ //everything is valid
            const pwd=(await (bcrypt.hash(newPassword, 10)))
            try{
                await User.updateOne(
                    {email},{$set:{password: pwd}}
                )
                MESSAGE= "Password successfully changed"
                res.json({status: 'ok'}) //successful update
            }catch(err){ 
                MESSAGE= "Session failed, please try again"
                res.json({status:'error', error:'Invalid Session'}) //case where there is something wrong with client's JWT
            } 

        }
    }else{
        MESSAGE= "Wrong old password input, try again"
        return res.json({ status: 'wrong password'})
    }
}


/////////////////////////// PRODUCTS /////////////////////////////////////
exports.addItemInventory = (req, res) => {
  
    const token = req.body.cookies
 
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

    Product.find((err, products) => {
        if (!err) { res.send(products) } //sending the products on front-end
      })
   
}

exports.editItemInventory = (req, res, next) => {
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
            MESSAGE = req.body.s_name + " sucessfully edited"
            res.json({status: 'ok'})
            }
        })
    }
    

       //VERIFY FIRST IF LOGGED IN AND TOKENS ARE NOT TAMPERED
       if (token) {
        var decoded = jwt.decode(token, {complete: true});
       
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
exports.addTransaction = async (req,res,next) => {
    //does not need any filter as 
    //any role can make transactions
    let token = req.body.cookies;
    let decoded = jwt.decode(token, {complete: true}); //decodes the token first
    if (!decoded.payload){
        MESSAGE="Login credentials failed"
        return res.json({status: 'error'})
    }else{
        let vendor = decoded.payload.username
    

    let product =[]
    for (var i = 0; i< req.body.purchased.length;i++){
         //find ID
         //check if the stock is MORE THAN the quanitty demand
         //this will be modified in the front end
         //make sure that the max number of q in 
         //the respectic=ve html forms are limited

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
      
        newTransaction.save((err) => { //saved in the data base
          if (!err) { 
            MESSAGE="Transaction has been recorded" 
            return res.json({status: "ok"})
         }else {
         MESSAGE = err.toString()
         return res.json({status: "invalid"}) }
        })
    }
    
}

exports.viewTransactions = (req, res, next) => {
    Transaction.find((err, transactions) => {
        if (!err) { res.send(transactions) } 
      })
   
}

//prompts
exports.prompt = (req, res)=>{
    return res.json({status: MESSAGE})
}