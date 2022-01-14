const mongoose = require('mongoose');

const Transaction = mongoose.model('Transaction',{
    vendor: String,
     products: [ //structure of products
      {
           productName: String,
           productQuantity: Number,
           productPrice: Number
      }
     ],
     amountToBePaid:{ //This and the ones below are used for transactions
       type: Number,
      required: true
      },
  
     status:{
         type: String,
         required: true
     },
     time : { 
         type: Number, 
         default: (new Date()).getTime() 
      }
  });

  module.exports = {Transaction}