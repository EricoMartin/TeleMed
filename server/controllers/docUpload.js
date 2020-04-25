const cloudinary = require( 'cloudinary');
const env = require( 'dotenv');
const multer = require( 'multer');
const Datauri = require( 'datauri');
const path = require( 'path');
const httpStatus = require( '../HttpStatus/index');
const docModel = require( '../models/doctor');


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

const uploader = multer({storage: storage}).single('images');

const uriD = new Datauri();
const dataUri = (req) => uriD.format(path.extname(req.file.originalname).toString(), req.file.buffer)

const cloudUploader = (req, res) =>{
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
        await docModel.findByIdAndUpdate({ '_id': req.params.id}, {$set: data}, { new: true });
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
const display = (req, res) => {
    
console.log(req.params)
  docModel.findOne( {imgUrl: req.params.imgUrl}, function (err, posts) {
      if(err) res.send(err);

      res.status(httpStatus.OK).json({posts: posts});
  });
}

module.exports=  {
  display,
  uploader,
  cloudUploader
};
