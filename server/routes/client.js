import { Router } from 'express';

const router = Router();
// TeleMed root route
router.get('/', (req, res) => {
    res.send({
      status: 'Successfull',
      data: 'Welcome to TeleMed App API',
    });
  });

router.post('/auth/signup');

export default router;