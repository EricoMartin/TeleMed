const jwt = require( 'jsonwebtoken');
const bcrypt = require( 'bcryptjs');
const env = require( 'dotenv');

const doctorModel = require( '../models/doctor');
const HttpStatus = require( '../HttpStatus/index');

env.config();
const EXPIRES = '48h';

const doctor ={
    getAllDoctors: (req, res) => {
        doctorModel.find()
      .then((doctors) => res.json(doctors))
      .catch(err => res.status(400).json('Error:'`${err}`));
  },
    getADoctor: async (req, res) => {
        await doctorModel.findById(req.params.id).populate('client')
        .then((doc) => res.json(doc))
        .catch(err => res.status(400).json('Error:'`${err}`));
    },
    createNewDoctor: async (req, res) => {
        const {firstName, lastName, password, confirmPassword, phone, email, regID} = req.body;
        const details = [firstName, lastName, phone, email, regID, password, confirmPassword];
      
          const valid = (props, data) => props.find((index) => data[index] === undefined || data[index] === '' || data[index] === null);
          if (!valid(details, req.body)) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              status: HttpStatus.UNAUTHORIZED,
              message: 'Fill all required fields',
            });
          }
      
          if (req.body.password.length < 8 || req.body.email.length >= 30
                  || req.body.firstName.length >= 30 || req.body.lastName.length >= 30) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
              status: HttpStatus.UNAUTHORIZED,
              message: 'Ensure password is atleast 8 characters, name and email not more than 30 characters',
            });
          }
          try {
            const emailFound = doctorModel.findOne(req.body.email);
            
            if (emailFound.length) {
              return res.status(HttpStatus.BAD_REQUEST).json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Doctors Email already exists',
              });
            }
        }finally{
            const newDoc = new doctorModel({
                firstName, lastName, password, confirmPassword, phone, email, regID, 
                
            });
            const token = jwt.sign({newDoc: newDoc._id}, process.env.JWT_TOKEN, { expiresIn: EXPIRES }); 
            if (!newDoc) {
                return res.status(HttpStatus.BAD_REQUEST).json({
                  status: HttpStatus.BAD_REQUEST,
                  message: 'Doctors Email already exists',
                });
              }
              await newDoc.save().then(() => res.status(HttpStatus.CREATED).json({
                token,
                name: newDoc.firstName +  " " + newDoc.lastName,
                db_id: newDoc._id,
                message: 'New Doctor Created!',
              })
              ).catch((err) => {
                res.status(HttpStatus.BAD_REQUEST).json({
                  success: false,
                  err,
                  message: 'New Doctor is Not Created, Check for Errors and Try Again!',
                });
              });
        }
    }, 
    authenticateDoctor: (req, res) => {
        const { email} = req.body;
        const { password } = req.body;
    
        doctorModel.findOne({ email }).then((newDoc, err) => {
          if (err) {
            return res.status(HttpStatus.BAD_REQUEST)
              .json({
                status: HttpStatus.BAD_REQUEST,
                message: err,
              });
          }
          if (!newDoc) {
            return res.status(HttpStatus.NOT_FOUND).json({
              status: HttpStatus.NOT_FOUND,
              message: 'User Non Existent!',
            });
          }
          bcrypt.compare(password, newDoc.password, (err, result) => {
            if (err){
                return res.status(HttpStatus.BAD_REQUEST)
              .json({
                status: HttpStatus.BAD_REQUEST,
                message: err,
              });
            }
            if (result === true) {
              const payload = { newDoc };
              const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: EXPIRES });
              newDoc.password = undefined;
              return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                newDoc,
                token,
                message: 'Doctor Authenticated!',
              });
            }
            return res.status(HttpStatus.NOT_ACCEPTIBLE).json({
              status: HttpStatus.NOT_ACCEPTIBLE,
              error: 'Password did not match!',
            });
          });
        });
      },
      updateDoctor: async(req, res) =>{
        const { email, imgUrl} = req.body;
    
        await doctorModel.updateOne({ email: req.params.email}, {$set: imgUrl}, { new: true });
        await doctorModel.findOne({ email }).then((newDoc, err) => {
          if (err) {
            return res.status(HttpStatus.BAD_REQUEST)
              .json({
                status: HttpStatus.BAD_REQUEST,
                message: err,
              });
          }
          if (!newDoc) {
            return res.status(HttpStatus.NOT_FOUND).json({
              status: HttpStatus.NOT_FOUND,
              message: 'Doctor Non Existent!',
            });
          }
          bcrypt.compare(email, newDoc.email, (err, result) => {
            if (result === true) {
              const payload = { newDoc };
              const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: EXPIRES });
              newDoc.password = undefined;
              return res.status(HttpStatus.OK).json({
                status: HttpStatus.OK,
                newDoc,
                token,
                message: 'Doctor Authenticated!',
              });
            }
            return res.status(HttpStatus.NOT_ACCEPTIBLE).json({
              status: HttpStatus.NOT_ACCEPTIBLE,
              error: 'Password did not match!',
            });
          });
        });
      },
      deleteDoctor: (req, res) => {
        doctorModel.findByIdAndDelete(req.params.id).then(() =>{
            res.status(HttpStatus.OK)
            .json({
              status: HttpStatus.OK,
              message: 'Doctor Deleted Successfully',
            });
        })
        .catch(err => res.status(HttpStatus.NOT_FOUND).json('Error:'`${err}`))
    }
};
module.exports= doctor;