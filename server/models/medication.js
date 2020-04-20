import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const medicSchema = mongoose.Schema({
    medicName : {type: mongoose.Schema.Types.String, ref: 'client'},
    medicID: {type: mongoose.Schema.Types.ObjectId, ref: 'client'},
    medicStrength: {type: String},
    medUnits: {type: Number},
    medForm: {type: String},
    medClass: {type: String},
    manufacturer: {type: String},
    nafdacRegNumber: {type: Number},
    medicClients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
    
},
{
    timestamps: true
  });

  const medic = mongoose.model('medic', medicSchema);

  export default medic;