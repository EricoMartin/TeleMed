const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    orderName : {type: mongoose.Schema.Types.String, ref: 'product'},
    orderID: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    orderItemID: {type: mongoose.Schema.Types.ObjectId, ref: 'product'},
    orderUnits: {type: Number},
    orderType: {type: String},
    orderPrice: {type: Number},
    manufacturer: {type: String},
    nafdacRegNumber: {type: Number},
    orderClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
    
},
{
    timestamps: true
  });

  const order = mongoose.model('order', orderSchema);

  module.exports= order;