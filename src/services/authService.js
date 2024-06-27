import api from './api';


const getCsrfToken = async () => {
  try {
    const response = await api.get('/csrf/get-csrf-token', { withCredentials: true });
    return response.data.csrfToken;
  } catch (error) {
    throw error;
  }
};

const csrfProtectedApiCall = async (apiFunction, ...args) => {
  try {
    return await apiFunction(...args);
  } catch (error) {
   
    if (error.response && error.response.status === 403 && error.response.data.message.includes('CSRF')) {

      await getCsrfToken();
      return await apiFunction(...args);
    } else {
      throw error;
    }
  }
};


export const login = async (credentials) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.post('/auth/login', {
      email: credentials.email,
      password: credentials.password,
    });
    return response.data;
  });
};

export const refreshTokenApiCall = async () => {
  return csrfProtectedApiCall(async () => {
    const response = await api.post('/auth/refreshToken', {}, {
      withCredentials: true 
    });
    return response.data;
  });
};

export const register = async (userData) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.post('/user/register', userData);
    return response.data;
  });
};

export const logout = async () => {
  return csrfProtectedApiCall(async () => {
    const response = await api.post('/auth/logout', {}, {
      withCredentials: true 
    });
    // Remover tokens do localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return response.data;
  });
};

export const checkEmail = async (email) => {
  return csrfProtectedApiCall(async () => {
    try {
      const response = await api.post('/user/check-email', { email });
   
      return { isRegistered: true, data: response.data };
    } catch (error) {
    
      if (error.response && error.response.status === 404) {
        return { isRegistered: false, message: error.response.data.message };
      }
      // Se não for um 404, propaga o erro
      throw error;
    }
  });
};

export const requestPasswordReset = async (email, baseUrl) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.post('/auth/requestPasswordReset', { email, baseUrl });
    return response.data;
  });
};

export const resetPassword = async (token, newPassword) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.post(`/auth/resetPassword/${token}`, { newPassword });
    return response.data;
  });
};
