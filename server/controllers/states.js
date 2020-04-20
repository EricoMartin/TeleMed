import env from 'dotenv';

import stateModel from '../models/states';
import HttpStatus from '../HttpStatus/index';

const states = {

    getAllStates: (req, res) => {
      stateModel.find()
        .then((states) => res.json(states))
        .catch(err => res.status(400).json('Error:'`${err}`));
    },
  
    createState: (req, res) => {   
     
      const {
          stateId,
            name,
            totalCases,
            tollNumbers,
            isolationCentres
      } = req.body;

      try {
        const stateFound = stateModel.findOne(req.body.name);
        
        if (stateFound.length) {
          return res.status(HttpStatus.BAD_REQUEST).json({
            status: HttpStatus.BAD_REQUEST,
            message: 'State already exists',
          });
        }
        
        
      } finally {
        const newState = new stateModel({
            stateId,
            name,
            totalCases,
            tollNumbers,
            isolationCentres
        });
        newState.save().then(() => res.status(HttpStatus.CREATED).json({
            name: newState.name,
            stateId: newState.stateId,
            totalCases: newState.totalCases,
            db_id: newState._id,
            message: 'New State Created!',
          })
          ).catch((err) => {
            res.status(HttpStatus.BAD_REQUEST).json({
              success: false,
              err,
              message: 'State Not Created!',
            });
          });
          
        }
    },

    updateState: async(req, res) =>{
        const { name, totalCases} = req.body;
    
        await stateModel.updateOne({ name: name}, {$set: totalCases}, { new: true })
        .then((newState, err) => {
            if (err) {
              return res.status(HttpStatus.BAD_REQUEST)
                .json({
                  status: HttpStatus.BAD_REQUEST,
                  message: err,
                });
            };
            if (!newState) {
                return res.status(HttpStatus.NOT_FOUND).json({
                  status: HttpStatus.NOT_FOUND,
                  message: 'State Non Existent!',
                });
              }else{
                return res.status(HttpStatus.OK).json({
                    status: HttpStatus.OK,
                    newState,
                    message: 'State Updated!',
                  });
              }
        })
    },

    deleteState: async (req, res) => {
        const { name } = req.body;
    
        await stateModel.deleteOne(name);
        return res.json({
          message: "User deleted"
        })
      }

}
export default states;