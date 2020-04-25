const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName : {type: String},
    productID: {type: Number},
    productUnits: {type: Number},
    productType: {type: String},
    productPrice: {type: Number},
    manufacturer: {type: String},
    nafdacRegNumber: {type: Number},
    productClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
    
},
{
    timestamps: true
  });

  const product = mongoose.model('product', productSchema);

  module.exports= product;