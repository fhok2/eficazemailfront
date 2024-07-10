import api from './api';
import { signInWithGoogle, signUpWithEmailAndPassword, signInWithEmail } from './firebase';
import { GoogleAuthProvider } from 'firebase/auth';

const handleApiError = (error) => ({
  error: true,
  message: error.response?.data?.message || 'An unexpected error occurred'
});

const apiCall = async (method, endpoint, data = {}, config = {}) => {
  try {
    const response = await api[method](endpoint, data, config);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    return handleApiError(error);
  }
};

export const login = async (credentials) => {
  try {
       
    const response = await apiCall('post', '/auth/login', { email: credentials.email, password: credentials.password});
    if (!response.error) {
     
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('dashboardData', JSON.stringify(response.dashboardData));
    }
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return handleApiError(error);
  }
};

export const loginWithGoogle = async () => {
  try {
    const result = await signInWithGoogle();
    if (result.error) {
      return { error: true, message: result.error };
    }

    if (!result.user || !result.idToken) {
      return { error: true, message: 'No user or token returned from Google sign-in' };
    }

    const response = await apiCall('post', '/auth/google-login', { 
      user: result.user,
      idToken: result.idToken
    });
  
    if (!response.error) {
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      localStorage.setItem('dashboardData', JSON.stringify(response.user));
     
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};
export const refreshTokenApiCall = async (refreshToken) => {
  const response = await apiCall('post', '/auth/refreshToken', { refreshToken });
  if (!response.error) {
    localStorage.setItem('accessToken', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    // Atualize os dados do dashboard se necessário
    if (response.dashboardData) {
      localStorage.setItem('dashboardData', JSON.stringify(response.dashboardData));
    }
  }
  return response;
};

export const register = async (userData) => {
  try {
    const { user, error } = await signUpWithEmailAndPassword(userData.email, userData.password);
    if (error) {
      return { error: true, message: error };
    }
    const idToken = await user.getIdToken();
    const response = await apiCall('post', '/user/register', { ...userData, idToken });
    if (!response.error) {
      localStorage.setItem('accessToken', response.token);
      localStorage.setItem('refreshToken', response.refreshToken);
      if (response.dashboardData) {
        localStorage.setItem('dashboardData', JSON.stringify(response.dashboardData));
      }
    }
    return response;
  } catch (error) {
    return handleApiError(error);
  }
};

export const logout = async () => {
  const result = await apiCall('post', '/auth/logout', {}, { withCredentials: true });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('dashboardData');
  localStorage.removeItem('emailData');

  return result;
};

export const getDashboardData = () => {
  const data = localStorage.getItem('dashboardData');
  return data ? JSON.parse(data) : null;
};

export const checkEmail = (email) =>
  
  apiCall('post', '/user/check-email', { email });

export const requestPasswordReset = (email, baseUrl) =>
  apiCall('post', '/auth/requestPasswordReset', { email, baseUrl });

export const resetPassword = (token, newPassword) =>
  apiCall('post', `/auth/resetPassword/${token}`, { newPassword });