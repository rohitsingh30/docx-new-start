import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { AuthStatus } from '../types/enums';
import { AuthContextState, LoginCredentials, User } from '../types/Auth.types';
import { ERROR_MESSAGES } from '../constants/stringConstants';
import { MOCK_DATA } from '../constants/dataConstants';

// Create the auth context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

/**
 * AuthProvider component to wrap the app
 * 
 * Features:
 * - Mock authentication using MOCK_DATA.USERS
 * - Login with email/password validation
 * - Logout with state cleanup
 * - devLogin() for quick testing (development only)
 * - LocalStorage persistence
 * 
 * Usage:
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.UNAUTHENTICATED);

  /**
   * Login function - validates credentials against mock data
   * In production, this will be replaced with an API call
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setStatus(AuthStatus.LOADING);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Validate credentials
      if (!credentials.email || !credentials.password) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Check against mock user data
      const authenticatedUser = MOCK_DATA.USERS.find(
        (user) => 
          user.email.toLowerCase() === credentials.email.toLowerCase() &&
          user.password === credentials.password
      );

      if (!authenticatedUser) {
        throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
      }

      // Create user object (excluding password)
      const userWithoutPassword: User = {
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        name: authenticatedUser.name,
        role: authenticatedUser.role,
      };

      setUser(userWithoutPassword);
      setStatus(AuthStatus.AUTHENTICATED);

      // Store in localStorage for persistence (in production, use secure tokens)
      localStorage.setItem('docx_user', JSON.stringify(userWithoutPassword));
    } catch (error) {
      setStatus(AuthStatus.UNAUTHENTICATED);
      throw error;
    }
  }, []);

  /**
   * Logout function - clears user and auth state
   */
  const logout = useCallback(() => {
    setUser(null);
    setStatus(AuthStatus.UNAUTHENTICATED);
    localStorage.removeItem('docx_user');
  }, []);

  /**
   * Development-only bypass login
   * ONLY works when NODE_ENV is 'development'
   * Automatically logs in as first mock user
   */
  const devLogin = useCallback(() => {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('devLogin is only available in development mode');
      return;
    }

    // Use first mock user for quick testing
    const devUser = MOCK_DATA.USERS[0];
    const userWithoutPassword: User = {
      id: devUser.id,
      email: devUser.email,
      name: devUser.name,
      role: devUser.role,
    };

    setUser(userWithoutPassword);
    setStatus(AuthStatus.AUTHENTICATED);
    localStorage.setItem('docx_user', JSON.stringify(userWithoutPassword));
  }, []);

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = status === AuthStatus.AUTHENTICATED;

  /**
   * Check if auth is loading
   */
  const isLoading = status === AuthStatus.LOADING;

  const value: AuthContextState = {
    user,
    status,
    login,
    logout,
    devLogin,
    isAuthenticated,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Custom hook to use auth context
 */
export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
