import dotenv from 'dotenv';
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import {
  errorHandler,
  notFoundHandler,
} from './middlewares/errorMiddleware.js';

import connectDb from './config/dbConnect.js';

import authRoutes from './routes/authRoutes.js';

const app = express();

dotenv.config();

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

connectDb();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use('/api/v1/', authRoutes);

app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
});
