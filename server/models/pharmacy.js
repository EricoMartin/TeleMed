import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const pharmacySchema = mongoose.Schema({
    name : {type: String},
    phone: {type: Number},
    address: {type: String},
    email: {type: String},
    website: {type: String},
    regNumber: {type: Number},
    workingHours: {type: Date, open: new Date().setHours(8, 0, 0, 0), close: new Date().setHours(20, 0, 0, 0)},
    pharmacyClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
},
{
    timestamps: true
  });

  const pharmacy = mongoose.model('pharmacy', pharmacySchema);

  export default pharmacy;