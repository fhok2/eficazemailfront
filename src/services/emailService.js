
import api from './api';
import { jwtDecode } from 'jwt-decode';


const getCsrfToken = async () => {
  try {
    const response = await api.get('/csrf/get-csrf-token', { withCredentials: true });
    return response.data.csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
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

// Wrapping your functions
const forwardEmail = async (dataforwardEmail) => {
  return csrfProtectedApiCall(async () => {
    let customName = '';
    if (dataforwardEmail.customName) {
      customName = dataforwardEmail.customName.replace(/@.*/, '');
    } else {
      const baseName = dataforwardEmail.userEmail.replace(/@.*/, '');
      const randomNumber = Math.floor(Math.random() * 10000); // gera um número aleatório entre 0 e 9999
      customName = baseName + randomNumber;
    }

    const response = await api.post('/emails/direcionaremail', {
      userEmail: dataforwardEmail.userEmail,
      customName,
      purpose: dataforwardEmail.purpose,
    });

    return response.data;
  });
};

const createEmail = async (email, forwardTo) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.post('/email/create', { email, forwardTo });
    return response.data;
  });
};

const cancelForward = async (dataMail) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.put(`/emails/cancelarencaminhamento/${dataMail.forwardTo}/${dataMail.email}`);
    return response.data;
  });
};

const activateForward = async (dataMail) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.put(`/emails/reativarencaminhamento/${dataMail.forwardTo}/${dataMail.email}`);
    return response.data;
  });
};

const fetchUserEmails = async (page = 1, limit = 10) => {
  return csrfProtectedApiCall(async () => {
    const response = await api.get(`/emails/listaremailusuario?page=${page}&limit=${limit}`);
    return response.data;
  });
};

const updateDataMail = async (dataMail) => {
  return csrfProtectedApiCall(async () => {
    const accessToken = localStorage.getItem('accessToken');

    // Decodificar o token para obter o id e email
    const decodedToken = jwtDecode(accessToken);
    const userId = decodedToken.id;
    const userEmail = decodedToken.email;

    const dataFormatMail = {
      userEmail: userEmail,
      clientEmail: dataMail.clientEmail,
      forwardingEmail: dataMail.forwardingEmail,
      purpose: dataMail.purpose,
    };

    const response = await api.put(`/emails/atualizarencaminhamento/${userId}`, dataFormatMail);
    return response.data;
  });
};

export { forwardEmail, createEmail, cancelForward, fetchUserEmails, activateForward, updateDataMail };
