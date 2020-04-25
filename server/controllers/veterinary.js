const VeterinaryModel = require('../models/laboratory');
const HttpStatus = require('../HttpStatus/index');

const Veterinary = {
    createVeterinary: async (req, res) => {
        const newVeterinary = new VeterinaryModel({
        name : req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        vetName: req.body.vetName,
        vetPhone: req.body.vetPhone,
        email: req.body.email,
        website: req.body.website,
        regNumber: req.body.regNumber,
        workingHours: req.body.workingHours
    })
    if(!newVeterinary.name|| !newVeterinary.email){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Veterinary Name and Email',
          });
    }
    if(!newVeterinary.regNumber){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Veterinary Registration Number and retry',
          });
    }
    await newVeterinary.save().then(() => res.status(HttpStatus.CREATED).json({
        token,
        name: newVeterinary.name,
        vetName: newVeterinary.vetName,
        db_id: newVeterinary._id,
        message: 'New Laboratory Created!',
      })
      ).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          err,
          message: 'New Veterinary is Not Created, Check for Errors and Try Again!',
        });
      });
    }, 
    veterinaryLogin: (req, res) =>{
        VeterinaryModel.findOne(req.body.email)
        .then((hosp) =>{
            if(hosp.regNumber === VeterinaryModel.regNumber){
                res.status(HttpStatus.OK).json(hosp);
            }
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    getAllVeterinarys: (req, res) =>{
        VeterinaryModel.find().populate('client')
      .then((Veterinarys) => res.json(Veterinarys))
      .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    getAVeterinary: async (req, res) => {
        await VeterinaryModel.findById(req.params.id)
        .then((Veterinary) => res.json(Veterinary))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    updateVeterinary: (req, res) =>{
        const id= parseInt(req.params.id);
        const availPharmacies = VeterinaryModel.findById(id).then((newVeterinary, err) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST)
                  .json({
                    status: HttpStatus.BAD_REQUEST,
                    message: err,
                  });
              }
              VeterinaryModel.updateOne({newVeterinary}, {$set: req.body}, { new: true })
        });
        availPharmacies.save()
        .then(() => res.status(HttpStatus.ACCEPTED).json({msg: 'Veterinary Data Updated Successfully'})
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`))
        );
    },
    deleteVeterinary: (req, res) => {
        VeterinaryModel.findByIdAndDelete(req.params.id).then(() =>{
            res.status(HttpStatus.OK)
            .json({
              status: HttpStatus.OK,
              message: 'Veterinary Deleted Successfully',
            });
        })
        .catch(err => res.status(HttpStatus.NOT_FOUND).json('Error:'`${err}`))
    }
};
module.exports= Veterinary;