import axios from "axios";
import Cookies from "js-cookie";

// const baseURL = "http://localhost:3005/api";
const baseURL = 'https://emailpix.up.railway.app/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    let xsrfToken = Cookies.get('XSRF-TOKEN');
    if (!xsrfToken) {
      xsrfToken = localStorage.getItem('XSRF-TOKEN');
    }
    console.log('XSRF-TOKEN:', xsrfToken);
    if (xsrfToken) {
      config.headers['X-CSRF-Token'] = xsrfToken;
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

    if (error.response?.status === 403 && error.response.data.error?.includes('Invalid CSRF token')) {
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
    Cookies.set('XSRF-TOKEN', csrfToken, {
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      expires: new Date(Date.now() + 3600000) // 1 hour
    });

    // Apenas armazena no localStorage se o cookie não existir
    if (!Cookies.get('XSRF-TOKEN')) {
      localStorage.setItem('XSRF-TOKEN', csrfToken);
    }

    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
  }
}


async function refreshToken() {
  try {
    const response = await axiosInstance.post('/auth/refreshToken');
    const { accessToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    return true;
  } catch (error) {
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
