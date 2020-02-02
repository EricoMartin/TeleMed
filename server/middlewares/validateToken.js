import jwt from 'jsonwebtoken';
import env from 'dotenv';

import HttpStatus from '../HttpStatus/index';

 env.config();

 const getToken = (req) =>{
     const token = req.body.token || req.query.token || req.headers['master-token'];
     return token;
 }

 const validToken = (req, res, next) => {
     const token = getToken(req);

     if(token){
        jwt.verify(token, process.env.JWT_TOKEN, (err, decrypt) => {
            if(err){
                return res.json({
                    message: 'Could not resolve token',
                    success: false,
                    status: HttpStatus.NOT_ACCEPTIBLE
                });
            } else {
                    req.decrypt = decrypt
                    next();
            }
        })
     } else {
         return res.status(HttpStatus.FORBIDDEN).send({
             success: false,
             message: 'No token found'
         })
     }
 }

 export default validToken;