// authService.js

import api from './api';

const handleApiError = (error) => ({
  error: true,
  message: error.response?.data?.message || 'An unexpected error occurred'
});

const apiCall = async (method, endpoint, data = {}, config = {}) => {
  try {
    const response = await api[method](endpoint, data, config);
    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

export const login = async (credentials) => {
  const response = await apiCall('post', '/auth/login', credentials);
  if (!response.error) {
    localStorage.setItem('accessToken', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    localStorage.setItem('dashboardData', JSON.stringify(response.dashboardData));
  }
  return response;
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
  const response = await apiCall('post', '/user/register', userData);
  if (!response.error) {
    localStorage.setItem('accessToken', response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
    if (response.dashboardData) {
      localStorage.setItem('dashboardData', JSON.stringify(response.dashboardData));
    }
  }
  return response;
};

export const logout = async () => {
  const result = await apiCall('post', '/auth/logout', {}, { withCredentials: true });
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('dashboardData');
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