import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import generateToken from '../utils/generateToken';
import verifyToken from '../utils/verifyToken';


// Register user
export const registerUser = async (req: Request, res: Response): Promise<any> => {
  const { email, password,  rememberMe } = req.body;
  try {
    // Check if user exists
    const userExists = await User.findOne({ email });
    
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ email, password: hashedPassword });
   
    // Generate token
    generateToken(res, user.id,rememberMe );

    // Send response
    return res.status(201).json({ id: user._id, email: user.email });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// Login user
export const loginUser = async (req: Request, res: Response):Promise<any> => {
  const { email, password,rememberMe  } = req.body;
  try {
    console.log('login')
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    // Generate token
    generateToken(res, user.id,rememberMe );

    // Send response
    res.status(200).json({ id: user._id, email: user.email });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Server error', error: err });
  }
};


export const getMe = async (req: Request, res: Response) :Promise<any> => {
    const token = req.cookies.jwt;
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      // Verify the JWT token
      const decoded: any = verifyToken(token);
  
      // Find the user by the decoded user ID
      const user = await User.findById(decoded.userId).select('-password'); // exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Send user data
      return res.status(200).json({ id: user._id, email: user.email });
    } catch (err) {
      return res.status(401).json({ message: 'Unauthorized, token invalid or expired' });
    }
  };