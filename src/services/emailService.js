import api from "./api";

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
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error forwarding email:", error);
    throw error;
  }
};

const createEmail = async (email, forwardTo) => {
  try {
    console.log("Data being sent to /email/create:", { email, forwardTo });
    const response = await api.post("/email/create", { email, forwardTo });
    return response.data;
  } catch (error) {
    console.error("Error creating email:", error);
    throw error;
  }
};

const cancelForward = async (email) => {
  try {
    console.log("Data being sent to /email/cancelForward:", { email });
    const response = await api.post("/email/cancelForward", { email });
    return response.data;
  } catch (error) {
    console.error("Error canceling forward:", error);
    throw error;
  }
};

export { forwardEmail, createEmail, cancelForward };
