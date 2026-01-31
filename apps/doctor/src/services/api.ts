/**
 * API Service - Base API client for backend communication
 * 
 * Features:
 * - Centralized API configuration
 * - Automatic JWT token handling
 * - Request/response interceptors
 * - Error handling
 * - Type-safe requests
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

/**
 * Get JWT token from localStorage
 */
const getToken = (): string | null => {
  return localStorage.getItem('docx_token');
};

/**
 * Set JWT token in localStorage
 */
export const setToken = (token: string): void => {
  localStorage.setItem('docx_token', token);
};

/**
 * Remove JWT token from localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem('docx_token');
  localStorage.removeItem('docx_user');
};

/**
 * Build headers for API requests
 */
const buildHeaders = (includeAuth: boolean = true): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (includeAuth) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  return headers;
};

/**
 * Handle API response
 */
const handleResponse = async <T>(response: Response): Promise<T> => {
  // Check if response is ok (status 200-299)
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    let apiError: ApiError;

    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
      apiError = {
        message: errorMessage,
        statusCode: response.status,
        errors: errorData.errors,
      };
    } catch {
      apiError = {
        message: errorMessage,
        statusCode: response.status,
      };
    }

    // Handle 401 Unauthorized - token expired or invalid
    if (response.status === 401) {
      removeToken();
      window.location.href = '/login';
    }

    throw apiError;
  }

  // Parse JSON response
  const data = await response.json();
  return data;
};

/**
 * Make a GET request
 */
export const get = async <T>(endpoint: string, includeAuth: boolean = true): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = buildHeaders(includeAuth);

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  return handleResponse<T>(response);
};

/**
 * Make a POST request
 */
export const post = async <T>(
  endpoint: string,
  body: unknown,
  includeAuth: boolean = true
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = buildHeaders(includeAuth);

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse<T>(response);
};

/**
 * Make a PUT request
 */
export const put = async <T>(
  endpoint: string,
  body: unknown,
  includeAuth: boolean = true
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = buildHeaders(includeAuth);

  const response = await fetch(url, {
    method: 'PUT',
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse<T>(response);
};

/**
 * Make a PATCH request
 */
export const patch = async <T>(
  endpoint: string,
  body: unknown,
  includeAuth: boolean = true
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = buildHeaders(includeAuth);

  const response = await fetch(url, {
    method: 'PATCH',
    headers,
    body: JSON.stringify(body),
  });

  return handleResponse<T>(response);
};

/**
 * Make a DELETE request
 */
export const del = async <T>(endpoint: string, includeAuth: boolean = true): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = buildHeaders(includeAuth);

  const response = await fetch(url, {
    method: 'DELETE',
    headers,
  });

  return handleResponse<T>(response);
};

const api = {
  get,
  post,
  put,
  patch,
  del,
  setToken,
  removeToken,
};

export default api;
