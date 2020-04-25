import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const hospitalSchema = mongoose.Schema({
    name : {type: String},
    phone: {type: Number},
    address: {type: String},
    email: {type: String},
    website: {type: String},
    regNumber: {type: Number, required: true},
    workingHours: {type: Date},
    imgUrl: {type: String},
    regFee: {type: Number},
    specialization: {
        type: [String]
    },
    services:{
        type: [String]
    },
    ambulances: {type: Number},
    hospitalClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
    hospitalDoctors:[{type: mongoose.Schema.Types.ObjectId, ref: 'doctor'}],
},
{
    timestamps: true
  });

  const hospital = mongoose.model('Hospital', hospitalSchema);

  export default hospital;