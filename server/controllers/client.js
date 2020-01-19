import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import env from 'dotenv';

import clientModel from '../models/client'

env.config();

const  client = {

    async getAllClients(req, res) {
        clientModel.find()
            .then( (clients) => res.json(clients))
            .catch(err, res.status(400).json('Error:' `${err}`))
        },

    async createClient(req, res) {
        const {
            email,
            phone,
            age,
            password,
            confirmedPassword
        } = req.body;
        const userId = Math.floor(Math.random() * 100000) + 1 + Date.now();
        const isAdmin = false;
        const createdAt = new Date;

        let { username, firstName, lastName, address } = req.body;

        const clientDetails = [username, firstName, lastName, phone, email, age, address, password, 
            confirmedPassword  ];

        const invalid = (props, data) => props.find((index) => data[index] === undefined || data[index] === '' || data[index] === null);

        if (invalid(clientDetails, req.body)) {
            return res.status(400).json({
              status: 400,
              message: 'Fill all required fields',
            });
          }

        if (req.body.password.length < 8 || req.body.email.length >= 30
            || req.body.firstName.length >= 30 || req.body.lastName.length >= 30) {
            return res.status(400).json({
                status: 400,
                message: 'Ensure password is atleast 8 characters, name and email not more than 30 characters',
            });
            }

            try {
                const emailFound = await clientModel.find(req.body.email);
                if (emailFound.rows[0] !== undefined && emailFound.rows[0].email === req.body.email) {
                  return res.status(400).json({
                    status: 400,
                    message: 'User Email already exists',
                  });
                }
        }finally{
            const newClient = new clientModel({
                userId,
                isAdmin,
                createdAt,
                clientDetails
            });
        }
    }
}
