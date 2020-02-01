import { Router } from 'express';
import newClient from '../controllers/client';
//import upload from '../controllers/upload';
import multer from 'multer';

const router = Router();
// TeleMed root route
router.get('/', (req, res) => {
  res.send({
    status: 'Successfull',
    data: 'Welcome to TeleMed App API',
  });
});

router.post('/auth/signup/', newClient.createClient);
router.get('/clients/', newClient.getAllClients);
const upload = multer({
  dest: 'images',
  limits: {
    fileSize: 1000000
  },

  fileFilter(req, file, cb){
    file.originalname.endsWith('.jpg') || file.originalname.endsWith('.jpeg') 
    || file.originalname.endsWith('.png') ? cb(null, true) : cb(new Error("Invalid File Extension Not Allowed"));
  }

})
router.post('/clients/upload', upload.single('imgUrl'), (req, res) =>{
  
  res.send();
},
  (error, req, res, next) =>{
    res.status(400).send({error: error.message});
  }
);

router.post('/auth/signin', newClient.authenticateClient);


export default router;