const controller = require('./controller');
const cookieParser = require('cookie-parser');
var cors = require('cors');
module.exports = (app) => {
  app.use(cors())
    // Allow Cross Origin Resource Sharing
    //This will ensure that the database is shared among
    //all the parts of the backend
    app.use((req, res, next) => {
      //res.setHeader('Access-Control-Allow-Origin', '*');
      res.header("Access-Control-Allow-Origin", "*"); //CORS policy
      res.header('Access-Control-Allow-Credentials', true); //allows with credential = true
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
      next();
    })
 

    
  
    
    //middleware
    app.use(cookieParser())

    //accounts pages
    app.get('/', controller.homepage)
    app.post('/login', controller.login)
    app.post('/set-up-account', controller.setUpAccount)
    app.post('/add-user', controller.addUser)
    app.get("/edit-user", controller.editUser)
    app.post("/edit-user", controller.editUserDatabase)

    //products
    app.post('/add-product', controller.addItemInventory)
    app.get('/view-inventory', controller.viewInventory)
    app.post('/edit-product', controller.editItemInventory)
    app.post('/delete-product', controller.deleteProduct)

    //transactions
    app.post('/add-transaction', controller.addTransaction)
    app.get('/view-transactions', controller.viewTransactions)
  }