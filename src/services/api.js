import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// Configurar uma instância do Axios
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true, // Inclui os cookies em cada requisição
});

// Função para obter o token CSRF
const getCsrfToken = async () => {
  const { data } = await axiosInstance.get('/csrf/get-csrf-token');
  return data.csrfToken;
};

console.log(getCsrfToken());

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
