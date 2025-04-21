import jwt from 'jsonwebtoken';

const verifyToken = (token: string) => {
  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    return decoded; // Return the decoded token data (e.g., userId)
  } catch (err) {
    // If the token is invalid or expired, throw an error
    throw new Error('Invalid or expired token');
  }
};

export default verifyToken;
