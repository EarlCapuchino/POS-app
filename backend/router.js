const controller = require('./controller');
const cookieParser = require('cookie-parser');
var cors = require('cors');

module.exports = (app) => {
  app.use(cors({
    origin: true
  }))
 

    
  
    
    //middleware
    app.use(cookieParser())


    //dashboard
    app.post('/dashboard', controller.dashboard)

    //accounts pages
    app.get('/', controller.homepage)
    app.post('/login', controller.login)
    app.post('/set-up-account', controller.setUpAccount)
    app.post('/add-user', controller.addUser)
    app.get("/edit-user", controller.editUser)
    app.post("/edit-user", controller.editUserDatabase)
    app.post("/logout", controller.logout)
    app.post("/change-password", controller.changePassword)

    //products
    app.post('/add-product', controller.addItemInventory)
    app.get('/view-inventory', controller.viewInventory)
    app.post('/edit-product', controller.editItemInventory)
    app.post('/delete-product', controller.deleteProduct)

    //transactions
    app.post('/add-transaction', controller.addTransaction)
    app.get('/view-transactions', controller.viewTransactions)

    //prompts
    app.get("/prompt", controller.prompt)
  }