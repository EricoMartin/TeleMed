
import env from 'dotenv';
import multer from 'multer';
import Datauri from 'datauri';
import path from 'path';


env.config();

 
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
const dataUri = (req) => uriD.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export  {
  upload,
  dataUri
};
