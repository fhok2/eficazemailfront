import api from './api';
import { jwtDecode } from 'jwt-decode';

class ApiError extends Error {
  constructor(message, statusCode, originalError) {
    super(message);
    this.name = 'ApiError';
    this.statusCode = statusCode;
    this.originalError = originalError;
  }
}

const apiCall = async (apiFunction, ...args) => {
  try {
    const response = await apiFunction(...args);
    return response.data;
  } catch (error) {
    console.error('API call error:', error);
    const statusCode = error.response?.status || 500;
    const message = error.response?.data?.message || error.message || 'Unknown error occurred';
    throw new ApiError(message, statusCode, error);
  }
};

export const forwardEmail = async (dataforwardEmail) => {
  let customName = dataforwardEmail.customName
    ? dataforwardEmail.customName.replace(/@.*/, '')
    : `${dataforwardEmail.userEmail.replace(/@.*/, '')}${Math.floor(Math.random() * 10000)}`;

  return apiCall(api.post, '/emails/direcionaremail', {
    userEmail: dataforwardEmail.userEmail,
    customName,
    purpose: dataforwardEmail.purpose,
  });
};

export const createEmail = async (email, forwardTo) => {
  return apiCall(api.post, '/email/create', { email, forwardTo });
};

export const cancelForward = async (dataMail) => {
  return apiCall(api.put, `/emails/cancelarencaminhamento/${dataMail.forwardTo}/${dataMail.email}`);
};

export const activateForward = async (dataMail) => {
  return apiCall(api.put, `/emails/reativarencaminhamento/${dataMail.forwardTo}/${dataMail.email}`);
};

export const fetchUserEmails = async (page = 1, limit = 10) => {
  return apiCall(api.get, `/user/listaremailusuario?page=${page}&limit=${limit}`);
};

export const updateDataMail = async (dataMail) => {
  const accessToken = localStorage.getItem('accessToken');
  const { id: userId, email: userEmail } = jwtDecode(accessToken);

  const dataFormatMail = {
    userEmail,
    clientEmail: dataMail.clientEmail,
    forwardingEmail: dataMail.forwardingEmail,
    purpose: dataMail.purpose,
  };

  return apiCall(api.put, `/emails/atualizarencaminhamento/${userId}`, dataFormatMail);
};

export const verifyMail = async (tokenObj) => {
  const response = await apiCall(api.get, `/emails/validar-email/${tokenObj.token}`);
 
  return response;
};

export const validateMail = async (dataValidation) => {
  return apiCall(api.post, `/emails/enviar-token-verificacao`, { email: dataValidation.email,baseUrl: dataValidation.baseUrl });

};