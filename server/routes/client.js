const express = require('express');
const newClient = require('../controllers/client');
const newDoctor = require('../controllers/doctor');
const newHospital = require('../controllers/hospital');
const newState = require('../controllers/states');
const newPost = require('../controllers/blog');
const newEmergency = require('../controllers/emergency');
const newPharmacy = require('../controllers/pharmacy');
const newLab = require('../controllers/laboratory');
const newVet = require('../controllers/veterinary');
const { upload, cloudUpload}  = require('../controllers/upload');
const { uploader, cloudUploader}  = require('../controllers/docUpload');
const { uploaded, cloudUploaded} = require('../controllers/hosUploads');


const validateToken = require('../middlewares/validateToken');


const router = express.Router();
// TeleMed root route
router.get('/api/v1', (req, res) => {
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
// upload clients image to cloudinary
router.post('/clients/upload/:id', upload, cloudUpload);
router.post('/client/update', newClient.updateClient);

//Doctors
router.get('/doc/', newDoctor.getAllDoctors);
router.get('/doc/:id', newDoctor.getADoctor);
router.post('/auth/doc/signup', newDoctor.createNewDoctor);
router.post('/auth/doc/signin', newDoctor.authenticateDoctor);
router.put('/doc/update/:id', newDoctor.updateDoctor);
router.delete('/doc/:id', newDoctor.deleteDoctor);
// upload doctors image to cloudinary
router.post('/doc/upload/:id', uploader, cloudUploader);
router.post('/doc/updater', newDoctor.updateDoctor);

//Hospitals
router.get('/hosp/', newHospital.getAllHospitals);
router.get('/hosp/:id', newHospital.getAHospital);
router.post('/hosp/signup',  newHospital.createHospital);
router.post('/hosp/signin', newHospital.hospitalLogin);
router.post('/hosp/update/:id', newHospital.updateHospital);
router.delete('/hosp/delete/:id', newHospital.deleteHospital);
// upload doctors image to cloudinary
router.post('/hosp/upload/:id', uploaded, cloudUploaded);

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
router.delete('/posts/delete/:id', newPost.deletePost);

//Emergency
router.get('/urgent/', newEmergency.getAllEmergencies);
router.post('/urgent/new', newEmergency.createEmergency);
router.delete('/urgent/delete/:id', newEmergency.deleteEmergencies);

//Pharmacy
router.get('/pharm/', newPharmacy.getAllPharmacys);
router.get('/pharm/:id', newPharmacy.getAPharmacy);
router.post('/pharm/new', newPharmacy.createPharmacy);
router.post('/pharm/update/:id', newPharmacy.updatePharmacy);
router.delete('/pharm/delete/:id', newPharmacy.deletePharmacy);

//Labs
router.get('/lab/', newLab.getAllLaboratoriess);
router.get('/lab/:id', newLab.getALaboratories);
router.post('/lab/new', newLab.createLaboratories);
router.post('/lab/update/:id', newLab.updateLaboratories);
router.delete('/lab/delete/:id', newLab.deleteLaboratories);

//Vet
router.get('/vet/', newVet.getAllVeterinarys);
router.get('/vet/:id', newVet.getAVeterinary);
router.post('/vet/new', newVet.createVeterinary);
router.post('/vet/update/:id', newVet.updateVeterinary);
router.delete('/vet/delete/:id', newVet.deleteVeterinary);

module.exports= router;