import axios from 'axios';

const baseURL = 'https://emailpix.up.railway.app/api';

// Configurar uma instância do Axios
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 10000, // Tempo limite de 10 segundos
});

// Função para obter o token CSRF
const getCsrfToken = async () => {
  const { data } = await axiosInstance.get('/csrf/get-csrf-token');
  return data.csrfToken;
};



// Função para fazer requisições com CSRF usando Axios
const axiosWithCsrf = async (url, options = {}) => {
  const csrfToken = await getCsrfToken();

  return axiosInstance({
    url,
    ...options,
    headers: {
      ...options.headers,
      'X-CSRF-Token': csrfToken,
      'Content-Type': 'application/json',
    },
  });
};

// Definir métodos HTTP no objeto api
const api = ['get', 'post', 'put', 'delete'].reduce((acc, method) => {
  acc[method] = (url, data, options = {}) =>
    axiosWithCsrf(url, { ...options, method, data });
  return acc;
}, {});

export default api;
