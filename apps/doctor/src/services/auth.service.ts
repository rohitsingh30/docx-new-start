/**
 * Authentication Service - Handles all auth-related API calls
 * 
 * Features:
 * - Login with email/password
 * - Logout
 * - Get current user
 * - JWT token management
 */

import { post, get, setToken, removeToken, ApiResponse } from './api';
import { User } from '../types/Auth.types';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    doctorId?: string;
    patientId?: string;
  };
}

export interface GetMeResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  doctor?: {
    id: string;
    specialization: string;
    licenseNumber: string;
    phoneNumber: string;
    status: string;
  };
  patient?: {
    id: string;
    dateOfBirth: string;
    gender: string;
    bloodType: string;
    phoneNumber: string;
  };
}

/**
 * Login with email and password
 */
export const login = async (credentials: LoginRequest): Promise<User> => {
  const response = await post<ApiResponse<LoginResponse>>(
    '/auth/login',
    credentials,
    false // Don't include auth header for login
  );

  // Store token
  setToken(response.data.token);

  // Transform backend user to frontend User type
  const user: User = {
    id: response.data.user.id,
    email: response.data.user.email,
    name: response.data.user.name,
    role: response.data.user.role,
    doctorId: response.data.user.doctorId,
    patientId: response.data.user.patientId,
  };

  // Store user in localStorage
  localStorage.setItem('docx_user', JSON.stringify(user));

  return user;
};

/**
 * Logout current user
 */
export const logout = async (): Promise<void> => {
  try {
    // Call backend logout endpoint
    await post('/auth/logout', {});
  } catch (error) {
    // Continue with logout even if API call fails
    console.error('Logout API call failed:', error);
  } finally {
    // Always clean up local storage
    removeToken();
  }
};

/**
 * Get current authenticated user
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await get<ApiResponse<GetMeResponse>>('/auth/me');

  // Transform backend user to frontend User type
  const user: User = {
    id: response.data.id,
    email: response.data.email,
    name: response.data.name,
    role: response.data.role,
    doctorId: response.data.doctor?.id,
    patientId: response.data.patient?.id,
  };

  // Update user in localStorage
  localStorage.setItem('docx_user', JSON.stringify(user));

  return user;
};

/**
 * Check if user has a valid token
 */
export const hasValidToken = (): boolean => {
  const token = localStorage.getItem('docx_token');
  return !!token;
};

/**
 * Get stored user from localStorage
 */
export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem('docx_user');
  if (!userStr) return null;

  try {
    return JSON.parse(userStr) as User;
  } catch {
    return null;
  }
};

const authService = {
  login,
  logout,
  getCurrentUser,
  hasValidToken,
  getStoredUser,
};

export default authService;
