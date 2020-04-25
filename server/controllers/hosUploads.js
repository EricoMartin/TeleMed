const cloudinary = require( 'cloudinary');
const env = require('dotenv');
const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');
const httpStatus = require( '../HttpStatus/index');
const hospitalModel = require( '../models/hospital');

env.config(); 

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET      
});

 
const storage = multer.memoryStorage({
  limits: {
    fileSize: 1000000
  },

  fileFilter(req, file, cb){
    req.file.originalname.endsWith('.jpg') || req.file.originalname.endsWith('.jpeg') 
    || req.file.originalname.endsWith('.png') ? cb(null, true) : cb(new Error("Invalid File Extension Not Allowed"));
  }

})

const uploaded = multer({storage: storage}).single('images');

const uriD = new Datauri();
const dataUri = (req) => uriD.format(path.extname(req.file.originalname).toString(), req.file.buffer)

const cloudUploaded = (req, res) =>{
  if(req.file){
        const file = dataUri(req).content;
     cloudinary.uploader.upload(file, {eager: [
      {width: 150, height: 150, gravity: "face", crop: "crop"}
     ]}) 
    .then( async (result) => {   
        const data ={
          imgUrl: result.secure_url,
          publicId: result.public_id
        }
        await hospitalModel.findByIdAndUpdate({ '_id': req.params.id}, {$set: data}, { new: true });
        res.status(httpStatus.OK).json({
        message: 'Image uploaded to cloudinary successfully!',
        data: {
          result
        }
      })
    }).catch( err => res.status(httpStatus.BAD_REQUEST).json({
      message: 'Error uploading image',
      data: {
        err
      }
    }))
  }
  
}
module.exports= {uploaded, cloudUploaded}