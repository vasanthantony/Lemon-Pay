import express from 'express';
import connectDB from './config/db';
import dotenv from 'dotenv';
// server.ts (continued)
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import taskRoutes from './routes/taskRoutes';
// import './types/express'; // Importing the augmentation file

const cors = require("cors");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


// Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true // if you're using cookies/auth headers
}));

// Middleware
app.use(express.json());


app.use(cookieParser());
app.use('/api/auth', authRoutes);

app.use('/api/tasks', taskRoutes);

// Connect to DB
connectDB();

// Base route
app.get('/', (_, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
