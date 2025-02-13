import cors from 'cors';
import express from 'express';
import 'express-async-errors';
import mongoose from "mongoose";
import scenesRouter from "./controllers/scenes";
import {
  authenticateUser,
  errorHandler,
  extractUser,
} from "./middlewares/auth";
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

app.use(extractUser);

app.use("/api/scenes", authenticateUser, scenesRouter);

app.use(errorHandler);

export default app