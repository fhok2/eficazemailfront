
import api from './api';
import { jwtDecode } from "jwt-decode";


const forwardEmail = async (dataforwardEmail) => {
  let customName = '';
  if (dataforwardEmail.customName) {
    customName = dataforwardEmail.customName.replace(/@.*/, '');
  } else {
    const baseName = dataforwardEmail.userEmail.replace(/@.*/, '');
    const randomNumber = Math.floor(Math.random() * 10000); // gera um número aleatório entre 0 e 9999
    customName = baseName + randomNumber;
  }

  try {
    const response = await api.post("/emails/direcionaremail", {
      userEmail: dataforwardEmail.userEmail,
      customName,
      purpose: dataforwardEmail.purpose,
    });
    
    return response.data;
  } catch (error) {
    console.error("Error forwarding email:", error);
    throw error;
  }
};

const createEmail = async (email, forwardTo) => {
  try {
 
    const response = await api.post("/email/create", { email, forwardTo });
    return response.data;
  } catch (error) {
    console.error("Error creating email:", error);
    throw error;
  }
};

const cancelForward = async (dataMail) => {
  try {
    const response = await api.put(`/emails/cancelarencaminhamento/${dataMail.forwardTo}/${dataMail.email
}`);
    return response.data;
  } catch (error) {
    console.error("Error canceling forward:", error);
    throw error;
  }
};


const activateForward = async (dataMail) => {
  try {
    const response = await api.put(`/emails/reativarencaminhamento/${dataMail.forwardTo}/${dataMail.email}`);
    return response.data;
  } catch (error) {
    console.error("Error activating forward:", error);
    throw error;
  }
};



const fetchUserEmails = async (page = 1, limit = 10) => {
 
  try {
    const response = await api.get(`/emails/listaremailusuario?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error("Error getting emails:", error);
    throw error;
  }
};
const updateDataMail = async (dataMail) => {
  const accessToken = localStorage.getItem("accessToken");

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
 
  

  try {
    const response = await api.put(`/emails/atualizarencaminhamento/${userId}`, dataFormatMail, {
    });
    return response.data;
  } catch (error) {
    console.error("Error updating email:", error);
    throw error;
  }
};



export { forwardEmail, createEmail, cancelForward,fetchUserEmails,activateForward,updateDataMail};
