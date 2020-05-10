const mongoose = require('mongoose');

const hospitalSchema = mongoose.Schema({
    name : {type: String},
    password: {type: String},
    confirmPassword: {type: String},
    phone: {type: Number},
    address: {type: String},
    email: {type: String},
    website: {type: String},
    regNumber: {type: Number, required: true},
    workingHours: {type: Date},
    imgUrl: {type: String, default: ''},
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

  hospitalSchema.pre('save', function(next){
  
    const user = this;
    if(user.isNew){
      let salt = bcrypt.genSaltSync(10);
      let hashed = bcrypt.hashSync(user.password, salt);
      user.password = hashed;
    }
    next();
    });

  const hospital = mongoose.model('Hospital', hospitalSchema);

  module.exports= hospital;