import mongoose from 'mongoose';

const emergencySchema = mongoose.Schema({
    emergencyType: {type: String, default: 'pregnancy'},
    clientName: {type: String},
    clientPhone: {type: Number},
    clientAddress: {type: String},
    requireAmbulance: {type: Boolean},
    doctorsName: {type: String},
    hospitalsName:  {type: String},
    icu:  {type: Boolean},
}, {
    timestamps: true
})

const emergency = mongoose.model( 'emergency', emergencySchema)

export default emergency;