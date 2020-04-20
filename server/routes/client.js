import { Router } from 'express';
import newClient from '../controllers/client';
import newDoctor from '../controllers/doctor';
import newHospital from '../controllers/hospital';
import newState from '../controllers/states';
import newPost from '../controllers/blog';
import { upload, cloudUpload}  from '../controllers/upload';
import validateToken from '../middlewares/validateToken';


const router = Router();
// TeleMed root route
router.get('/', (req, res) => {
  res.send({
    status: 'Successfull',
    data: 'Welcome to TeleMed App API',
  });
});
//Clients
router.post('/auth/signup/', newClient.createClient);
router.get('/clients/', validateToken, newClient.getAllClients);
router.get('/client/:id', newClient.getClient)
router.post('/auth/signin',  newClient.authenticateClient);
router.post('/auth/signout', newClient.signOutClient);
// upload image to cloudinary
router.post('/clients/upload/:id', upload, cloudUpload);
router.post('/client/update', newClient.updateClient);

//Doctors
router.get('/doc/', newDoctor.getAllDoctors);
router.get('/doc/:id', newDoctor.getADoctor);
router.post('/auth/doc/signup', newDoctor.createNewDoctor);
router.post('/auth/doc/signin', newDoctor.authenticateDoctor);
router.put('/doc/update/:id', newDoctor.updateDoctor);
router.delete('/doc/:id', newDoctor.deleteDoctor);

//Hospitals
router.get('/hosp/', newHospital.getAllHospitals);
router.get('/hosp/:id', newHospital.getAHospital);
router.post('/hosp/signup', newHospital.createHospital);
router.post('/hosp/signin', newHospital.hospitalLogin);
router.post('/hosp/update/:id', newHospital.updateHospital);
router.delete('/hosp/delete/:id', newHospital.deleteHospital);

//States
router.get('/state', newState.getAllStates);
router.post('/state/new', newState.createState);
router.post('/state/update', newState.updateState);
router.delete('/state/delete', newState.deleteState);

//Blog Posts
router.get('/post/', newPost.getAllPosts);
router.get('/posts/:id', newPost.getAPost);
router.post('/posts/new', newPost.createPost);
router.post('/posts/update/:id', newPost.updatePost);
router.delete('/posts/dele/:id', newPost.deletePost);

export default router;