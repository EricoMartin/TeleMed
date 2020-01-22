import { Router } from 'express';
import newClient from '../controllers/client';

const router = Router();
// TeleMed root route
router.get('/', (req, res) => {
  res.send({
    status: 'Successfull',
    data: 'Welcome to TeleMed App API',
  });
});

router.post('/auth/signup/', newClient.createClient);

export default router;
