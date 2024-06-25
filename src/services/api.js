import axios from "axios";
import Cookies from 'js-cookie';

const baseURL = 'https://emailpix.up.railway.app/api';
// const baseURL = "http://localhost:3005/api";

// Configurar uma instância do Axios
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-CSRF-Token'
});


const getCsrfToken = async () => {
  try {
    let token = Cookies.get('XSRF-TOKEN');
   
    if (!token) {
      
      const response = await axiosInstance.get("/csrf/get-csrf-token");
      token = response.data.csrfToken;
      
      
      if (token) {
        Cookies.set('XSRF-TOKEN', token, { secure: process.env.NODE_ENV === 'production' });
      } else {
        console.error('No CSRF token received from server');
      }
    }
    
    return token;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    return null;
  }
};

const getAuthorizationToken = async () => {
  // Lógica para obter o token de autorização (por exemplo, do armazenamento local)
  const token = localStorage.getItem("accessToken");
  return token || null; // Retorna null se não houver token
};

// Função para fazer requisições com CSRF e token de autorização usando Axios
const axiosWithCsrfAndAuth = async (url, options = {}) => {
  const csrfToken = await getCsrfToken();
  const authToken = await getAuthorizationToken();

  const headers = {
    ...options.headers,
    "X-CSRF-Token": csrfToken,
    "Content-Type": "application/json",
  };

  // Adiciona o token de autorização somente se houver um
  if (authToken) {
    headers["Authorization"] = `Bearer ${authToken}`;
  }

  return axiosInstance({
    url,
    ...options,
    headers,
  });
};

// Definir métodos HTTP no objeto api
const api = ["get", "post", "put", "delete"].reduce((acc, method) => {
  acc[method] = (url, data, options = {}) =>
    axiosWithCsrfAndAuth(url, { ...options, method, data });
  return acc;
}, {});

export default api;
