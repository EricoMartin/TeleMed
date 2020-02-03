import { Router } from 'express';
import newClient from '../controllers/client';
import { upload, cloudUpload }  from '../controllers/upload';
import validateToken from '../middlewares/validateToken';


const router = Router();
// TeleMed root route
router.get('/', (req, res) => {
  res.send({
    status: 'Successfull',
    data: 'Welcome to TeleMed App API',
  });
});

router.post('/auth/signup/', newClient.createClient);

router.get('/clients/', validateToken, newClient.getAllClients);

// upload image to cloudinary
router.post('/clients/upload', validateToken, upload, cloudUpload);

router.post('/auth/signin', validateToken, newClient.authenticateClient);

router.post('/auth/signout', validateToken, newClient.signOutClient);


export default router;