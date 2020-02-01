/*
import env from 'dotenv';
import multer from 'multer';


env.config();

 
const upload = multer({
  dest: '/images',
  limits: {
    fileSize: 1000000
  },

  fileFilter(req, file, cb){
    file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') 
    || file.originalname.endsWith('.png') ? cb(null, true) : cb(new Error("Invalid File Extension Not Allowed"));
  }

})


export default upload;
*/