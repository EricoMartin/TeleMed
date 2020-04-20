import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './routes/client';


dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true});
const connect = mongoose.connection;

connect.once('open', () => console.log('Connection to Mongoose Database established successfully!'));

app.use(cors({
    allowedHeaders:['sessionId', 'Content-Type', 'master-token'],
    exposedHeaders: ['sessionId'],
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', router);

app.listen(port, () => console.log(`TeleMed App is running on port: ${port}`));

export default app;
