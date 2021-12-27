const controller = require('./controller');
const cookieParser = require('cookie-parser');

module.exports = (app) => {
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
    app.get('/homepage', controller.homepage)

  }