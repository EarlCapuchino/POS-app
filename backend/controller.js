
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://capu-pos-admin:MushroomBlueworm118@cluster0.bkkqs.mongodb.net/capu-pos-app?retryWrites=true&w=majority',  { useNewUrlParser: true }, {useUnifiedTopology: true})


exports.homepage =  (req, res) =>{ //hompage scree, will check iof there are existing users or none
    console.log("HOMEPAGE")


}
