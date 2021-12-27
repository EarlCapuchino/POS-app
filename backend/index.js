const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//require('./router')(app)
//Julian =))
app.listen(4000, (err) => {
  if (err) { console.log(err) }
  else {console.log('Server started at port 4000')}
})