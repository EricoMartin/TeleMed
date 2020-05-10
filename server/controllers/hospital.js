const jwt = require( 'jsonwebtoken');
const bcrypt = require( 'bcryptjs');
const env = require( 'dotenv');

const hospitalModel = require('../models/hospital');
const HttpStatus = require( '../HttpStatus/index');

env.config();
const EXPIRES = '48h';

const hospital = {
    createHospital: async (req, res) => {
      const {name, email, regNumber} = req.body;
        
    if(!name.length || !email.length){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Hospital Name and Email',
          });
    }
    if(!regNumber){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Hospital Registration Number and retry',
          });
    }
    const newHospital = new hospitalModel({
      name : req.body.name,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
      phone: req.body.phone,
      address: req.body.address,
      email: req.body.email,
      website: req.body.website,
      regNumber: req.body.regNumber,
      workingHours: req.body.workingHours,
      regFee: req.body.regFee,
      specialization: req.body.specialization,
      services: req.body.services,
      ambulances: req.body.ambulances
  })
  const token = jwt.sign({newHospital: newHospital._id}, process.env.JWT_TOKEN, { expiresIn: EXPIRES });
  if (!newHospital) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      status: HttpStatus.BAD_REQUEST,
      message: 'Hospital already exists',
    });
  }
    await newHospital.save().then(() => res.status(HttpStatus.CREATED).json({
        token,
        name: newHospital.name,
        db_id: newHospital._id,
        message: 'New Hospital Created!',
      })
      ).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          err,
          message: 'New Hospital is Not Created, Check for Errors and Try Again!',
        });
      });
    }, 
    hospitalLogin: (req, res) =>{
      const { email, password} = req.body;
      

        hospitalModel.findOne({email})
        .then((hosp, err) =>{
          if (err) {
             res.status(HttpStatus.BAD_REQUEST)
              .json({
                status: HttpStatus.BAD_REQUEST,
                message: err,
              });
          }

          if (!hosp) {
            return res.status(HttpStatus.NOT_FOUND).json({
              status: HttpStatus.NOT_FOUND,
              message: 'Hospital Non Existent!',
            });
          }
            if(!req.body.regNumber){
              return res.status(HttpStatus.NOT_FOUND).json({
                status: HttpStatus.NOT_FOUND,
                message: 'Hospital Non Existent!',
              });
            }
              bcrypt.compare(password, hosp.password, (err, result) => {
                if (err){
                    return res.status(HttpStatus.BAD_REQUEST)
                  .json({
                    status: HttpStatus.BAD_REQUEST,
                    message: err,
                  });
                }
              if (result === true) {
                const payload = { hosp };
                const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: EXPIRES });
                newDoc.password = undefined;
                return res.status(HttpStatus.OK).json({
                  status: HttpStatus.OK,
                  message: 'Hospital Authenticated!',
                  hosp: hosp,
                  token
                });
            }
            return res.status(HttpStatus.NOT_ACCEPTIBLE).json({
              status: HttpStatus.NOT_ACCEPTIBLE,
              error: 'Password did not match!',
            });
        });
      });
    },
    getAllHospitals: (req, res) =>{
        hospitalModel.find().populate('client').populate('doctors')
      .then((hospitals) => res.json(hospitals))
      .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    getAHospital: async (req, res) => {
        await hospitalModel.findById(req.params.id).populate('doctors').populate('clients')
        .then((hospital) => res.json(hospital))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    updateHospital: (req, res) =>{
        const id= parseInt(req.params.id);
        const availHopsitals = hospitalModel.findById(id).then((newHospital, err) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST)
                  .json({
                    status: HttpStatus.BAD_REQUEST,
                    message: err,
                  });
              }
              hospitalModel.updateOne({newHospital}, {$set: req.body}, { new: true })
        });
        availHopsitals.save()
        .then(() => res.status(HttpStatus.ACCEPTED).json({msg: 'Hospital Data Updated Successfully'})
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`))
        );
    },
    deleteHospital: (req, res) => {
        hospitalModel.findByIdAndDelete(req.params.id).then(() =>{
            res.status(HttpStatus.OK)
            .json({
              status: HttpStatus.OK,
              message: 'Hospital Deleted Successfully',
            });
        })
        .catch(err => res.status(HttpStatus.NOT_FOUND).json('Error:'`${err}`))
    }
};
module.exports= hospital;
