// index.js
import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import messageRoutes from './routes/messageRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(messageRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on =${PORT}`);
    });
  })
  .catch((err) => console.log(err));
