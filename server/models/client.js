import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
  userId: { type: Number, required: true },
  username: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, enum: ['patient', 'nurse', 'doctor', 'dentist', 'specialist', 'pharmacist'] },
  isAdmin: { type: Boolean, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  nhis_ID: { type: Number, required: false },
  email: { type: String, required: true },
  createdAt: { type: Date, required: true },
  Address: { type: String, required: false },
  workAddress: { type: String, required: false },
  phone: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: false },
  bloodGroup: { type: String, required: false },
  genotype: { type: String, required: false },
  height: { type: Number, required: false },
  weight: { type: Number, required: false },
  complexion: { type: String, required: false },
  nextOfKin: { type: String, required: false },
  disability: { type: Boolean, required: false },
  disability_Type: { type: String, required: false },
  Treatments: { type: Number, required: false },
  Current_Treatment: { type: String, required: false },
  accountType: { type: String, required: false },
  accountBal: { type: Number, required: false },

},
{ timeStamps: true });
userSchema.pre('save', (next) => {
  const user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      res.json({ success: false, msg: err.message });
    } else {
      bcrypt.hash(user.password, salt, (err, hashed) => {
        if (err) {
          return next;
        }
        user.password = hashed;
        next();
      });
    }
  });
});
const client = mongoose.model('Client', userSchema);

export default client;
