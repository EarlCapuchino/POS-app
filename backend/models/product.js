const mongoose = require('mongoose');
const Product = mongoose.model('Product', { //product structure
    name: String,
    price: Number,
    stock: Number,
    addedBy: String
})

module.exports = {Product}