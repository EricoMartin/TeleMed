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
    workingHours: {type: Date},
    veterinaryClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
},
{
    timestamps: true
  });

  const veterinary = mongoose.model('veterinary', veterinarySchema);

  export default veterinary;