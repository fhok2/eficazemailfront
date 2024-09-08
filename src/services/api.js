import axios from "axios";

// const baseURL = "http://localhost:3005/api";
const baseURL = 'https://email-pix.onrender.com/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

// Lista de rotas que não requerem autenticação
const publicRoutes = ['/auth/login', '/auth/register', '/emails/validar-email', '/auth/refreshToken', '/emails/enviar-token-verificacao','/auth/google-login'];

axiosInstance.interceptors.request.use(
  (config) => {
    // Verifica se a rota atual está na lista de rotas públicas
    const isPublicRoute = publicRoutes.some(route => config.url.includes(route));
    
    if (!isPublicRoute) {
      const authToken = localStorage.getItem("accessToken");
      if (authToken) {
        config.headers["Authorization"] = `Bearer ${authToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error.response?.data || error.message);

    if (error.response?.status === 401 && !publicRoutes.some(route => error.config.url.includes(route))) {
      console.warn('Access token expired. Attempting to refresh...');
      const refreshed = await refreshToken();
      if (refreshed) {
        return axiosInstance(error.config);
      }
    }

    return Promise.reject(error);
  }
);

async function refreshToken() {
  try {
    const response = await axiosInstance.post('/auth/refreshToken');
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return true;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return false;
  }
}

const api = ["get", "post", "put", "delete"].reduce((acc, method) => {
  acc[method] = (url, data, options = {}) =>
    axiosInstance({
      url,
      method,
      data,
      ...options,
    });
  return acc;
}, {});

export default api;