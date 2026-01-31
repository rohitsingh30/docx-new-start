import { Request, Response } from 'express';
import { UserRole } from '../types/enums';
import { comparePassword } from '../utils/password';
import { generateToken } from '../utils/jwt';
import { successResponse, errorResponse } from '../utils/response';
import { DoctorModel, PatientModel, UserModel } from '../models';

/**
 * Login controller
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    // Validate input
    if (!email || !password) {
      return errorResponse(res, 400, 'Email and password are required');
    }
    
    // Find user
    const user = await UserModel.findOne({
      email: email.toLowerCase(),
      deletedAt: null,
    }).lean();
    
    if (!user) {
      return errorResponse(res, 401, 'Invalid credentials');
    }
    
    // Verify password
    const isValid = await comparePassword(password, user.password);
    if (!isValid) {
      return errorResponse(res, 401, 'Invalid credentials');
    }
    
    // Generate JWT
    const [doctor, patient] = await Promise.all([
      DoctorModel.findOne({ userId: user.id }).lean(),
      PatientModel.findOne({ userId: user.id }).lean(),
    ]);

    const token = generateToken({
      userId: user.id,
      role: user.role as UserRole,
      doctorId: doctor?.id,
      patientId: patient?.id,
    });
    
    // Return user data (without password) and token
    const { password: _, ...userWithoutPassword } = user;
    
    return successResponse(res, {
      user: {
        ...userWithoutPassword,
        doctor,
        patient,
      },
      token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse(res, 500, 'Login failed');
  }
};

/**
 * Get current user controller
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId;
    
    if (!userId) {
      return errorResponse(res, 401, 'Not authenticated');
    }
    
    const user = await UserModel.findOne({ id: userId, deletedAt: null }).lean();
    
    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }
    
    const [doctor, patient] = await Promise.all([
      DoctorModel.findOne({ userId: user.id }).lean(),
      PatientModel.findOne({ userId: user.id }).lean(),
    ]);

    return successResponse(res, {
      ...user,
      doctor,
      patient,
    });
  } catch (error) {
    console.error('Get current user error:', error);
    return errorResponse(res, 500, 'Failed to get user');
  }
};

/**
 * Logout controller (client-side token removal)
 */
export const logout = async (req: Request, res: Response) => {
  // With JWT, logout is handled client-side by removing the token
  // This endpoint exists for consistency and potential future server-side token blacklisting
  return successResponse(res, { message: 'Logged out successfully' });
};
