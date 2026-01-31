import jwt from 'jsonwebtoken';
import { UserRole } from '../types/enums';

export interface JWTPayload {
  userId: string;
  role: UserRole;
  doctorId?: string;
  patientId?: string;
}

/**
 * Generate a JWT token
 */
export const generateToken = (payload: JWTPayload): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign(payload, secret, {
    expiresIn: '7d',
  });
};

/**
 * Verify and decode a JWT token
 */
export const verifyToken = (token: string): JWTPayload => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.verify(token, secret) as JWTPayload;
};
