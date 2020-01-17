import express from 'express';
import cors from 'cors';

import mongoose from 'mongoose';

import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connect = mongoose.connection;

connect.once('open', ()=> console.log(`Connection to Mongoose Database established successfully!`));

app.use(cors());
app.use(express.json());
app.listen(port, _=> console.log(`TeleMed App is running on port : ${port}`));