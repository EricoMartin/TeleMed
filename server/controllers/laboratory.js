import LaboratoriesModel from '../models/laboratory';
import HttpStatus from '../HttpStatus/index';

const Laboratories = {
    createLaboratories: async (req, res) => {
        const newLaboratories = new LaboratoriesModel({
        name : req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        attendantName: req.body.attendantName,
        attendantPhone: req.body.attendantPhone,
        email: req.body.email,
        website: req.body.website,
        regNumber: req.body.regNumber,
        workingHours: req.body.workingHours
    })
    if(!newLaboratories.name|| !newLaboratories.email){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Laboratories Name and Email',
          });
    }
    if(!newLaboratories.regNumber){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Laboratories Registration Number and retry',
          });
    }
    await newLaboratories.save().then(() => res.status(HttpStatus.CREATED).json({
        token,
        name: newLaboratories.name,
        db_id: newLaboratories._id,
        message: 'New Laboratory Created!',
      })
      ).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          err,
          message: 'New Laboratories is Not Created, Check for Errors and Try Again!',
        });
      });
    }, 
    laboratoriesLogin: (req, res) =>{
        LaboratoriesModel.findOne(req.body.email)
        .then((hosp) =>{
            if(hosp.regNumber === LaboratoriesModel.regNumber){
                res.status(HttpStatus.OK).json(hosp);
            }
        })
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    getAllLaboratoriess: (req, res) =>{
        LaboratoriesModel.find().populate('client')
      .then((Laboratoriess) => res.json(Laboratoriess))
      .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    getALaboratories: async (req, res) => {
        await LaboratoriesModel.findById(req.params.id)
        .then((Laboratories) => res.json(Laboratories))
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    updateLaboratories: (req, res) =>{
        const id= parseInt(req.params.id);
        const availPharmacies = LaboratoriesModel.findById(id).then((newLaboratories, err) => {
            if (err) {
                return res.status(HttpStatus.BAD_REQUEST)
                  .json({
                    status: HttpStatus.BAD_REQUEST,
                    message: err,
                  });
              }
              LaboratoriesModel.updateOne({newLaboratories}, {$set: req.body}, { new: true })
        });
        availPharmacies.save()
        .then(() => res.status(HttpStatus.ACCEPTED).json({msg: 'Laboratories Data Updated Successfully'})
        .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`))
        );
    },
    deleteLaboratories: (req, res) => {
        LaboratoriesModel.findByIdAndDelete(req.params.id).then(() =>{
            res.status(HttpStatus.OK)
            .json({
              status: HttpStatus.OK,
              message: 'Laboratories Deleted Successfully',
            });
        })
        .catch(err => res.status(HttpStatus.NOT_FOUND).json('Error:'`${err}`))
    }
};
export default Laboratories;