import { AuthStatus } from './enums';

/**
 * User type for authenticated doctor
 */
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

/**
 * Login credentials interface
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Auth context state
 */
export interface AuthContextState {
  user: User | null;
  status: AuthStatus;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  devLogin: () => void; // Development-only bypass
  isAuthenticated: boolean;
  isLoading: boolean;
}

/**
 * Auth error type
 */
export interface AuthError {
  message: string;
  field?: string;
}
