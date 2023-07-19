import dotenv from 'dotenv';
import express from 'express';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import connectDB from './config/connect.js';
dotenv.config();

const port = process.env.PORT || 5000;

const DB = process.env.MONGO_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
connectDB(DB);
const app = express();

app.get('/', (req, res) => {
  res.send('Server is ready...');
});

app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server on port: ${port}`);
});
