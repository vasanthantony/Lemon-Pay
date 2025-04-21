import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("MONGO_URI is not defined in the environment variables.");
      process.exit(1);  // Exit the process if MongoDB URI is not found
    }
    console.log(process.env.MONGO_URI)
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
