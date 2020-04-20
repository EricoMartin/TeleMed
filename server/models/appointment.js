import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const appointSchema = mongoose.Schema({
    clientName : {type: mongoose.Schema.Types.String, ref: 'client'},
    clientID: {type: mongoose.Schema.Types.ObjectId, ref: 'client'},
    doctorName : {type: mongoose.Schema.Types.String, ref: 'doctor'},
    doctorID: {type: mongoose.Schema.Types.ObjectId, ref: 'doctor'},
    phone: {type: Number},
    address: {type: String},
    email: {type: String},
    regNumber: {type: Number},
    appointTime: {open: 0800, close: 1200 },
    prevAppointments: {type: Number},
    consultFee: {type: Number},
    paidFee: { type: Boolean, default: false},
    describeSymptoms: { type: String},
    admissions: {
        type: [String]
    },
    surgeries:{
        type: [String]
    },
    appointClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
    
},
{
    timestamps: true
  });

  const appoint = mongoose.model('appoint', appointSchema);

  export default appoint;