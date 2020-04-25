
const hospitalModel = require('../models/hospital');
const HttpStatus = require( '../HttpStatus/index');


const hospital = {
    createHospital: async (req, res) => {
        const newHospital = new hospitalModel({
        name : req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        regNumber: req.body.regNumber,
        workingHours: req.body.workingHours,
        regFee: req.body.regFee,
        specialization: req.body.specialization,
        services: req.body.services,
        ambulances: req.body.ambulances
    })
    if(!newHospital.name|| !newHospital.email){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Hospital Name and Email',
          });
    }
    if(!newHospital.regNumber){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Hospital Registration Number and retry',
          });
    }
    await newHospital.save().then(() => res.status(HttpStatus.CREATED).json({
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
        hospitalModel.findOne(req.body.email)
        .then((hosp) =>{
            if(hosp.regNumber === hospitalModel.regNumber){
                res.status(HttpStatus.OK).json(hosp);
            }
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
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
