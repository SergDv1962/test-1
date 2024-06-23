import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from './routes/auth.js'

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

app.use('/api/auth', authRoute)

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.p7x4moj.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    app.listen(PORT, () => {
      console.log(`Server listening to http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
