import PharmacyModel from '../models/Pharmacy';
import HttpStatus from '../HttpStatus/index';

const pharmacy = {
    createPharmacy: async (req, res) => {
        const newPharmacy = new PharmacyModel({
        name : req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        email: req.body.email,
        website: req.body.website,
        regNumber: req.body.regNumber,
        workingHours: req.body.workingHours
    })
    if(!newPharmacy.name|| !newPharmacy.email){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Pharmacy Name and Email',
          });
    }
    if(!newPharmacy.regNumber){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Pharmacy Registration Number and retry',
          });
    }
    await newPharmacy.save().then(() => res.status(HttpStatus.CREATED).json({
        token,
        name: newPharmacy.name,
        db_id: newPharmacy._id,
        message: 'New Pharmacy Created!',
      })
      ).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          err,
          message: 'New Pharmacy is Not Created, Check for Errors and Try Again!',
        });
      });
    }, 
    pharmacyLogin: (req, res) =>{
        PharmacyModel.findOne(req.body.email)
        .then((hosp) =>{
            if(hosp.regNumber === PharmacyModel.regNumber){
                res.status(HttpStatus.OK).json(hosp);
            }
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    getAllPharmacys: (req, res) =>{
        PharmacyModel.find().populate('client')
      .then((Pharmacys) => res.json(Pharmacys))
      .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    getAPharmacy: async (req, res) => {
        await PharmacyModel.findById(req.params.id)
        .then((Pharmacy) => res.json(Pharmacy))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    updatePharmacy: (req, res) =>{
        const id= parseInt(req.params.id);
        const availPharmacies = PharmacyModel.findById(id).then((newPharmacy, err) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST)
                  .json({
                    status: HttpStatus.BAD_REQUEST,
                    message: err,
                  });
              }
              PharmacyModel.updateOne({newPharmacy}, {$set: req.body}, { new: true })
        });
        availPharmacies.save()
        .then(() => res.status(HttpStatus.ACCEPTED).json({msg: 'Pharmacy Data Updated Successfully'})
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`))
        );
    },
    deletePharmacy: (req, res) => {
        PharmacyModel.findByIdAndDelete(req.params.id).then(() =>{
            res.status(HttpStatus.OK)
            .json({
              status: HttpStatus.OK,
              message: 'Pharmacy Deleted Successfully',
            });
        })
        .catch(err => res.status(HttpStatus.NOT_FOUND).json('Error:'`${err}`))
    }
};
export default pharmacy;