import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import authRouter from './controllers/auth';
import { MONGODB_URI } from './utils/config';
const app = express()

mongoose.set('strictQuery', false);

mongoose.connect(MONGODB_URI as string)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB: ', error.message)
    });

app.use(express.json())
app.use(cors());

app.use('/api/auth', authRouter)

export default app