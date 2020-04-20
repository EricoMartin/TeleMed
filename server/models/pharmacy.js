import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const pharmacySchema = mongoose.Schema({
    name : {type: String},
    phone: {type: Number},
    address: {type: String},
    email: {type: String},
    regNumber: {type: Number},
    workingHours: {open: 0800, close: 1200 },
    regFee: {type: Number},
    pharmacyClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
},
{
    timestamps: true
  });

  const pharmacy = mongoose.model('pharmacy', pharmacySchema);

  export default pharmacy;