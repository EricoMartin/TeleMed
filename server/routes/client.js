import { Router } from 'express';
import cloudinary from 'cloudinary';
import newClient from '../controllers/client';
import { upload, dataUri } from '../controllers/upload';
import httpStatus from '../HttpStatus/index';

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET      
});

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

router.post('/clients/upload', upload, (req, res) =>{
  if(req.file){
    const file = dataUri(req).content;
    return cloudinary.uploader.upload(file) 
    .then(result => {
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
);

router.post('/auth/signin', newClient.authenticateClient);


export default router;