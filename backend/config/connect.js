import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

// Connect to MongoDB

const connectDB = (url) => {
  return mongoose.connect(url);
};
export default connectDB;
