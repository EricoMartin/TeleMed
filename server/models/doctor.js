const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const doctorSchema = mongoose.Schema({
    firstName : {type: String, required: true },
    lastName : {type: String, required: true },
    hospital: {type: mongoose.Schema.Types.ObjectId, ref: 'hospital'},
    hospitalAddress: {type: String},
    imgUrl:{ type: String, default: ''},
    token:{ type: String, required: false},
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    phone: {type: Number},
    email: {type: String},
    regID: {type: Number},
    workingHours: {type: Date },
    consultFee: {type: Number},
    specialization: {
        type: [String]
    },
    clients: [{type: mongoose.Schema.Types.ObjectId, ref: 'client'}],
    
},
{
    timestamps: true
  });

  doctorSchema.pre('save', function(next){
  
    const user = this;
    if(user.isNew){
      let salt = bcrypt.genSaltSync(10);
      let hashed = bcrypt.hashSync(user.password, salt);
      user.password = hashed;
    }
    next();
    });
  const doctor = mongoose.model('Doctor', doctorSchema);

  module.exports= doctor;