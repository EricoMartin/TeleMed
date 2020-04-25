import mongoose from 'mongoose';

const laboratorySchema = mongoose.Schema({
    name : {type: String},
    phone: {type: Number},
    address: {type: String},
    attendantName: {type: String},
    attendantPhone: {type: Number},
    email: {type: String},
    website: {type: String},
    regNumber: {type: Number},
    workingHours: { type: Date, open: new Date().setHours(8, 0, 0, 0), close: new Date().setHours(20, 0, 0, 0) },
    laboratoryClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
},
{
    timestamps: true
  });

  const laboratory = mongoose.model('laboratory', laboratorySchema);

  export default laboratory;