import api from './api';
import { jwtDecode } from 'jwt-decode';

const apiCall = async (apiFunction, ...args) => {
  try {
    return await apiFunction(...args);
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};

const forwardEmail = async (dataforwardEmail) => {
  return apiCall(async () => {
    let customName = dataforwardEmail.customName
      ? dataforwardEmail.customName.replace(/@.*/, '')
      : `${dataforwardEmail.userEmail.replace(/@.*/, '')}${Math.floor(Math.random() * 10000)}`;

    const response = await api.post('/emails/direcionaremail', {
      userEmail: dataforwardEmail.userEmail,
      customName,
      purpose: dataforwardEmail.purpose,
    });

    return response.data;
  });
};

const createEmail = async (email, forwardTo) => {
  return apiCall(async () => {
    const response = await api.post('/email/create', { email, forwardTo });
    return response.data;
  });
};

const cancelForward = async (dataMail) => {
  return apiCall(async () => {
    const response = await api.put(`/emails/cancelarencaminhamento/${dataMail.forwardTo}/${dataMail.email}`);
    return response.data;
  });
};

const activateForward = async (dataMail) => {
  return apiCall(async () => {
    const response = await api.put(`/emails/reativarencaminhamento/${dataMail.forwardTo}/${dataMail.email}`);
    return response.data;
  });
};

const fetchUserEmails = async (page = 1, limit = 10) => {
  return apiCall(async () => {
    const response = await api.get(`/user/listaremailusuario?page=${page}&limit=${limit}`);
    return response.data;
  });
};

const updateDataMail = async (dataMail) => {
  return apiCall(async () => {
    const accessToken = localStorage.getItem('accessToken');
    const { id: userId, email: userEmail } = jwtDecode(accessToken);

    const dataFormatMail = {
      userEmail,
      clientEmail: dataMail.clientEmail,
      forwardingEmail: dataMail.forwardingEmail,
      purpose: dataMail.purpose,
    };

    const response = await api.put(`/emails/atualizarencaminhamento/${userId}`, dataFormatMail);
    return response.data;
  });
};

const verifyMail = async (dataMail) => {
  return apiCall(async () => {
    const response = await api.post('/emails/verificaremail', { email: dataMail.email, baseUrl: dataMail.baseUrl });
    return response.data;
  });

}

export { forwardEmail, createEmail, cancelForward, fetchUserEmails, activateForward, updateDataMail, };