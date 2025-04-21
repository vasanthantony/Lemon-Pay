import { Router } from 'express';  // use 'Router' instead of 'express'
import { registerUser, loginUser, getMe } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

const authRoutes: Router = Router();  // explicitly type the routes as 'Router'

// Define the routes
authRoutes.post('/signup', registerUser);
authRoutes.post('/login', loginUser);
authRoutes.get('/me', protect, getMe);
export default authRoutes;
