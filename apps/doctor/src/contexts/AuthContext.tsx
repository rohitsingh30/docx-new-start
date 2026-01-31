import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { AuthStatus } from '../types/enums';
import { AuthContextState, LoginCredentials, User, AuthProviderProps } from '../types/Auth.types';
import authService from '../services/auth.service';
import { ApiError } from '../services/api';

// Create the auth context
const AuthContext = createContext<AuthContextState | undefined>(undefined);

/**
 * AuthProvider component to wrap the app
 * 
 * Features:
 * - Real authentication using backend API
 * - Login with email/password validation
 * - JWT token management
 * - Logout with state cleanup
 * - devLogin() for quick testing (development only)
 * - Automatic token validation on mount
 * - LocalStorage persistence
 * 
 * Usage:
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState<AuthStatus>(AuthStatus.LOADING);

  /**
   * Initialize auth state from stored token
   */
  useEffect(() => {
    const initAuth = async () => {
      if (authService.hasValidToken()) {
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          setStatus(AuthStatus.AUTHENTICATED);
        } catch (error) {
          // Token invalid or expired
          authService.logout();
          setUser(null);
          setStatus(AuthStatus.UNAUTHENTICATED);
        }
      } else {
        setStatus(AuthStatus.UNAUTHENTICATED);
      }
    };

    initAuth();
  }, []);

  /**
   * Login function - calls backend API
   */
  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setStatus(AuthStatus.LOADING);

    try {
      const authenticatedUser = await authService.login(credentials);
      setUser(authenticatedUser);
      setStatus(AuthStatus.AUTHENTICATED);
    } catch (error) {
      setStatus(AuthStatus.UNAUTHENTICATED);
      
      // Transform API error to user-friendly message
      const apiError = error as ApiError;
      throw new Error(apiError.message || 'Login failed. Please try again.');
    }
  }, []);

  /**
   * Logout function - clears user and auth state
   */
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setStatus(AuthStatus.UNAUTHENTICATED);
    }
  }, []);

  /**
   * Development-only bypass login
   * ONLY works when NODE_ENV is 'development'
   * Automatically logs in with demo account (doctor@docx.com / demo123)
   */
  const devLogin = useCallback(async () => {
    if (process.env.NODE_ENV !== 'development') {
      console.warn('devLogin is only available in development mode');
      return;
    }

    try {
      await login({
        email: 'doctor@docx.com',
        password: 'demo123',
      });
    } catch (error) {
      console.error('Dev login failed:', error);
    }
  }, [login]);

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
