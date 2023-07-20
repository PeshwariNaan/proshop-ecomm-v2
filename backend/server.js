import dotenv from 'dotenv';
import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import connectDB from './config/connect.js';
import cookieParser from 'cookie-parser';
dotenv.config();

const port = process.env.PORT || 5000;

const DB = process.env.MONGO_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
connectDB(DB);
const app = express();

// Middleware
app.use(express.json()); // Allows us to accept JSON data in the body - body parser
app.use(express.urlencoded({ extended: true })); // Allows us to accept form data in the body

app.use(cookieParser()); // Allows us to accept cookies in the header

app.get('/', (req, res) => {
  res.send('Server is ready...');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
