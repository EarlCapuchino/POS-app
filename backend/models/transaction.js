const mongoose = require('mongoose');

const Transaction = mongoose.model('Transaction',{
    vendor: String,
     products: [
      {
           productName: String,
           productQuantity: Number,
           productPrice: Number
      }
     ],
     amountToBePaid:{
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