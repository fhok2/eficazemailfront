import api from './api';

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  } catch (error) {
    return { error: true, message: error.response ? error.response.data.message : 'An unexpected error occurred' };
  }
};

export const refreshTokenApiCall = async () => {
  try {
    const response = await api.post('/auth/refreshToken', {}, {
      withCredentials: true // Isso faz o axios incluir os cookies na requisição
    });
    return response.data;
  } catch (error) {
    return { error: true, message: 'Failed to refresh accessToken' };
  }
};

export const register = async (userData) => {
  try {
    const response = await api.post('/user/register', userData);
   
    return response.data;
  } catch (error) {
    return { error: true, message: error.response ? error.response.data.message : 'An unexpected error occurred' };
  }
};

export const logout = async () => {
  try {
    const response = await api.post('/auth/logout', {}, {
      withCredentials: true // Isso faz o axios incluir os cookies na requisição
    });
    // Remover tokens do localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response.data;
  } catch (error) {
    return { error: true, message: error.response ? error.response.data.message : 'An unexpected error occurred' };
  }
};

export const checkEmail = async (email) => {
  try {
    const response = await api.post('/user/check-email', { email });
    return response.data;
  } catch (error) {
    console.log(error);
    return { error: true, message: error.response ? error.response.data.message : 'An unexpected error occurred' };
  }
};


export const requestPasswordReset = async (email, baseUrl) => {
  try {
    const response = await api.post('/auth/requestPasswordReset', { email, baseUrl });
    return response.data;
  } catch (error) {
   
    return {
      error: true,
      message: error.response ? error.response.data.message : 'An unexpected error occurred'
    };
  }
};


export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post(`/auth/resetPassword/${token}`, { newPassword });
   
    return response.data;
  } catch (error) {
    
    return { 
      error: true, 
      message: error.response ? error.response.data.message : 'An unexpected error occurred' 
    };
  }
}