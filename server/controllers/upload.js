import mongoose from 'mongoose';
import cloudinary from 'cloudinary';
import env from 'dotenv';
import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';
import httpStatus from '../HttpStatus/index';
import clientModel from '../models/client';


env.config(); 

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET      
});

 
const storage = multer.memoryStorage({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },

  fileFilter(req, file, cb){
    req.file.originalname.endsWith('.jpg') || req.file.originalname.endsWith('.jpeg') 
    || req.file.originalname.endsWith('.png') ? cb(null, true) : cb(new Error("Invalid File Extension Not Allowed"));
  }

})

const upload = multer({storage: storage}).single('images');

const uriD = new Datauri();
const dataUri = (req) => uriD.format(path.extname(req.file.originalname).toString(), req.file.buffer)

const cloudUpload =  async (req, res) =>{
  if(req.file){
    const client = new clientModel({
      token: req.headers.token
    });
    client.imgUrl = req.file.path;
    
    await client.updateOne(client);
    const file = dataUri(req).content;
    return cloudinary.uploader.upload(file) 
    .then((result) => {
      const img = result.url;
      return res.status(httpStatus.OK).json({
        message: 'Image uploaded to cloudinary successfully!',
        data: {
          img
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

export  {
  upload,
  cloudUpload
};
