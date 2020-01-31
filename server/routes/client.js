import { Router } from 'express';
import newClient from '../controllers/client';
import upload from '../controllers/client';

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
router.post('/clients/upload',  (req, res) => {
  res.send()
},
  (error, req, res, next) =>{
    res.status(400).send({error: error.message})
  }
);

export default router;