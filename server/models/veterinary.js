import mongoose from 'mongoose';

const veterinarySchema = mongoose.Schema({
    name : {type: String},
    phone: {type: Number},
    address: {type: String},
    attendantName: {type: String},
    attendantPhone: {type: Number},
    email: {type: String},
    website: {type: String},
    regNumber: {type: Number},
    workingHours: {open: 0800, close: 1200 },
    veterinaryClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
},
{
    timestamps: true
  });

  const veterinary = mongoose.model('veterinary', veterinarySchema);

  export default veterinary;