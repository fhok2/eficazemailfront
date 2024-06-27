import axios from "axios";

// const baseURL = "http://localhost:3005/api";
const baseURL = 'https://emailpix.up.railway.app/api';

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
});


axiosInstance.interceptors.request.use(config => {
  const xsrfToken = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
  if (xsrfToken) {
    config.headers['X-CSRF-Token'] = xsrfToken.split('=')[1];
  }
  return config;
}, error => {
  return Promise.reject(error);
 
});


const getAuthorizationToken = () => {
  return localStorage.getItem("accessToken") || null;
};


axiosInstance.interceptors.request.use(config => {
  const authToken = getAuthorizationToken();
  if (authToken) {
    config.headers["Authorization"] = `Bearer ${authToken}`;
  }
  return config;
}, error => {

  return Promise.reject(error);
});

// Definir métodos HTTP no objeto api
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


