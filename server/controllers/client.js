/* eslint-disable */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from 'dotenv';

import clientModel from '../models/client';
import HttpStatus from '../HttpStatus/index';
import { welcomeMail } from '../controllers/sendmail';


env.config();
const EXPIRES = '24h';

 
const client = {

  getAllClients: (req, res) => {
    clientModel.find()
      .then((clients) => res.json(clients))
      .catch(err => res.status(400).json('Error:'`${err}`));
  },

  createClient: (req, res) => {   
   
    const {
      email,
      phone,
      age,
      password,
      confirmPassword,
    } = req.body;
    const userId = Math.floor(Math.random() * 100000) + 1 + Date.now();
    
       const isAdmin = false;

    
    const createdAt = new Date().toLocaleString();

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
      if(req.body.password === process.env.ADMIN_PASS){
        isAdmin = true;
      }
      
    } finally {
      const newClient = new clientModel({
        userId,
        isAdmin,
        createdAt,
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
      
      const token = jwt.sign({newClient: newClient._id}, process.env.JWT_TOKEN, { expiresIn: EXPIRES }); 

      console.log(newClient);
      console.log(token);

      if (!newClient) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          status: HttpStatus.BAD_REQUEST,
          message: 'User Email already exists',
        });
      }
      welcomeMail(newClient.email, newClient.firstName);
      newClient.save().then(() => res.status(HttpStatus.CREATED).json({
        token,
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
    const { email} = req.body;
    const { password } = req.body;

    clientModel.findOne({ email }).then((newClient, err) => {
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
          const payload = { newClient };
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
  updateClient: async(req, res) =>{
    const { email, imgUrl} = req.body;

    await clientModel.updateOne({ email: req.params.email}, {$set: imgUrl}, { new: true });
    await clientModel.findOne({ email }).then((newClient, err) => {
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
      bcrypt.compare(email, newClient.email, (err, result) => {
        if (result === true) {
          const payload = { newClient };
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
  getClient: (req, res) =>{
    const { userId} = req.body;

    clientModel.findOne({ userId }).then((newClient, err) => {
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
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        newClient,
        message: 'Client Found!',
      });
    })
  },
  signOutClient: (req, res) =>{
    if(req.headers){
      const header = req.headers;
    header.delete;
    return res.json({
      message: "User logged out"
    })
    } 
    
  },
  deleteClient: async (req, res) => {
    const { username } = req.body;

    await clientModel.deleteOne(username);
    return res.json({
      message: "User deleted"
    })
  }
};

export default client;
