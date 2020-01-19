import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    userId: Number, required: true,
    username:  String, required: true,
    firstName: String, required: true,
    lastName: String, required: true,
    role: { type: String, enum: ['patient','nurse', 'doctor', 'dentist', 'specialist', 'pharmacist'] },
    isAdmin: Boolean, required: true,
    password: String, required: true,
    confirmPassword: String, required: true,
    nhis_ID: Number, 
    email: String, required: true,
    createdAt: Date, required: true,
    Address: String, 
    workAddress: String, 
    phone: Number, required: true,
    age: Number, required: true,
    gender: String, 
    bloodGroup: String,
    genotype: String,
    height: Number,
    weight: Number,
    complexion: String,
    nextOfKin: String,
    disability: Boolean, 
    disability_Type: String,
    Treatments: Number,
    Current_Treatment: String,
    accountType: String,
    accountBal: Number

}, { timeStamps : true});
const client = mongoose.model('Client', userSchema);

export default client;