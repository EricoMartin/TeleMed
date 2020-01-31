/* eslint-disable */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';
import cloudinary from 'cloudinary';

import clientModel from '../models/client';
import HttpStatus from '../HttpStatus/index';


env.config();
const EXPIRES = '12Hrs';
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET      
});
 
const client = {

  getAllClients: (req, res) => {
    clientModel.find()
      .then((clients) => res.json(clients))
      .catch(err => res.status(400).json('Error:'`${err}`));
  },

  createClient: async (req, res) => {   
   
    const {
      email,
      phone,
      age,
      password,
      confirmPassword,
    } = req.body;
    const userId = Math.floor(Math.random() * 100000) + 1 + Date.now();
    
       const isAdmin = false;

    
    const createdAt = new Date();

    const {
      username, firstName, lastName, address,
    } = req.body;
    
    const clientDetails = [username, firstName, lastName, phone, email, age, address, password,
      confirmPassword];

    const valid = (props, data) => props.find((index) => data[index] === undefined || data[index] === '' || data[index] === null);

    if (!valid(clientDetails, req.body)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Fill all required fields',
      });
    }

    if (req.body.password.length < 8 || req.body.email.length >= 30
            || req.body.firstName.length >= 30 || req.body.lastName.length >= 30) {
      return res.status(HttpStatus.UNAUTHORIZED).json({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Ensure password is atleast 8 characters, name and email not more than 30 characters',
      });
    }

    try {
      
      const emailFound = clientModel.findOne(req.body.email);
      
      if (emailFound.length) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'User Email already exists',
        });
      }
    } finally {
      const newClient = new clientModel({
        userId,
        isAdmin,
        createdAt,
        clientDetails,
        username, 
        firstName, 
        lastName, 
        phone, 
        email, 
        age, 
        address, 
        password,
        confirmPassword
      });
      if(req.body.password === process.env.ADMIN_PASS){
        newClient.isAdmin = true;
      }
      console.log(newClient)
      if (!newClient) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'User Email already exists',
        });
      }
      newClient.save().then(() => res.status(HttpStatus.CREATED).json({
        username: newClient.username,
        userId: newClient.userId,
        db_id: newClient._id,
        message: 'New User Created!',
      })
      ).catch((err) => {
        res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          err,
          message: 'User Not Created!',
        });
      });
    }
    
  },

  authenticateClient: (req, res) => {
    const { username } = req.body;
    const { password } = req.body;

    clientModel.findOne({ username }).then((newClient, err) => {
      if (err) {
        return res.status(HttpStatus.BAD_REQUEST)
          .json({
            status: HttpStatus.BAD_REQUEST,
            message: err,
          });
      }
      if (!newClient) {
        return res.status(HttpStatus.NOT_FOUND).json({
          status: HttpStatus.NOT_FOUND,
          message: 'User Non Existent!',
        });
      }
      bcrypt.compare(password, newClient.password, (err, result) => {
        if (result === true) {
          const payload = { newClient: newClient._id };
          const token = jwt.sign(payload, process.env.JWT_TOKEN, { expiresIn: EXPIRES });
          newClient.password = undefined;
          return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            newClient,
            token,
            message: 'Client Authenticated!',
          });
        }
        return res.status(HttpStatus.NOT_ACCEPTIBLE).json({
          status: HttpStatus.NOT_ACCEPTIBLE,
          error: 'Password did not match!',
        });
      });
    });
  },
};

export default client;
