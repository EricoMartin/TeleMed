import EmergencyModel from '../models/emergency';
import HttpStatus from '../HttpStatus/index';

const Emergency = {
    createEmergency:  async (req, res) => {
        const newEmergency = new EmergencyModel({
        emergencyType : req.body.emergencyType,
        clientName: req.body.clientName,
        clientPhone: req.body.clientPhone,
        clientAddress: req.body.clientAddress,
        doctorsName: req.body.doctorsName,
        doctorRegNum: req.body.doctorRegNum,
        hospitalName: req.body.hospitalName,
        icu: req.body.icu,
        requireAmbulance: req.body.requireAmbulance
    })
    if(newEmergency.clientName === ""){
        return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Please state Client Name',
          });
    }
    await newEmergency.save().then(() => res.status(HttpStatus.CREATED).json({
        client_name: newEmergency.clientName,
        doctorsName: newEmergency.doctorsName,
        requireAmbulance: newEmergency.requireAmbulance,
        hospitalName: newEmergency.hospitalName,
        db_id: newEmergency._id,
        message: 'Your Emergency has been Created! Help is on its way',
      })
      ).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          err,
          message: 'New Emergency is Not Created, Check for Errors and Try Again!',
        });
      });
    }, 
    getAllEmergencies: (req, res) =>{
        EmergencyModel.find()
      .then((emerge) => res.json(emerge))
      .catch(err => res.status(HttpStatus.BAD_REQUEST).json('Error:'`${err}`));
    },
    deleteEmergencies: (req, res) => {
        EmergencyModel.findByIdAndDelete(req.params.id).then(() =>{
            res.status(HttpStatus.OK)
            .json({
              status: HttpStatus.OK,
              message: 'Veterinary Deleted Successfully',
            });
        })
        .catch(err => res.status(HttpStatus.NOT_FOUND).json('Error:'`${err}`))
    }
}
export default Emergency;