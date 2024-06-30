import axios from "axios";

const baseURL = "http://localhost:3005/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const xsrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='));
    if (xsrfToken) {
      config.headers['X-CSRF-Token'] = xsrfToken.split('=')[1];
    }
    
    const authToken = localStorage.getItem("accessToken");
    if (authToken) {
      config.headers["Authorization"] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.error('API Error:', error.response?.data || error.message);

    if (error.response?.status === 404 && error.config.url.includes('/user/check-email')) {
      // Para este endpoint específico, não trate 404 como um erro
      return Promise.resolve(error.response);
    }
    
    if (error.response?.status === 403 && error.response.data.message?.includes('CSRF')) {
      console.warn('CSRF token expired. Fetching new token...');
      await fetchCsrfToken();
      return axiosInstance(error.config);
    }
    
    if (error.response?.status === 401) {
      console.warn('Access token expired. Attempting to refresh...');
      const refreshed = await refreshToken();
      if (refreshed) {
        return axiosInstance(error.config);
      }
    }
    
    return Promise.reject(error);
  }
);

async function fetchCsrfToken() {
  try {
    const response = await axiosInstance.get('/csrf/get-csrf-token');
    const csrfToken = response.data.csrfToken;
    document.cookie = `XSRF-TOKEN=${csrfToken}; path=/`;
  } catch (error) {
    console.error('Failed to fetch CSRF token:', error);
  }
}

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

const api = ['get', 'post', 'put', 'delete'].reduce((acc, method) => {
  acc[method] = (url, data, options = {}) => {
    return axiosInstance({
      url,
      method,
      data,
      ...options,
    }).catch(error => {
      console.log('Error:', error);
      if (error.response) {
        console.error(`${method.toUpperCase()} ${url} failed:`, error.response.status, error.response.data);
      } else if (error.request) {
        console.error(`${method.toUpperCase()} ${url} failed: No response received`, error.request);
      } else {
        console.error(`${method.toUpperCase()} ${url} failed:`, error.message);
      }
      throw error;
    });
  };
  return acc;
}, {});

export default api;
