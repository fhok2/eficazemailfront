const { default: axios } = require('axios');
const { wrapper } = require('axios-cookiejar-support');
const { CookieJar } = require('tough-cookie');

wrapper(axios); // Aplica suporte ao jar em todas as instâncias do axios

const cookieJar = new CookieJar(); // Instância do cookie jar

const getCsrfToken = async () => {
  try {
    const response = await axios.get('http://localhost:3005/api/csrf/get-csrf-token', {
      jar: cookieJar,  // Assegure que o jar está sendo usado aqui
      withCredentials: true
    });
    return response.data.csrfToken;
  } catch (error) {
    console.error('Erro ao obter o token CSRF:', error.response ? error.response.data : error.message);
    return null;
  }
};

const testRequest = async () => {
  const csrfToken = await getCsrfToken();
  if (!csrfToken) {
    console.error('CSRF token não obtido');
    return;
  }

  try {
    console.log('cookie jar ' + JSON.stringify(cookieJar));
    const response = await axios.post('http://localhost:3005/api/emails/direcionaremail', {
      userEmail: 'teste@gmail.com',
      customName: 'teste',
    }, {
      jar: cookieJar,  // e aqui
      headers: { 'x-csrf-token': csrfToken },
      withCredentials: true
    });
    console.log('Response:', response.data);
  } catch (error) {
    console.error('Erro ao fazer a requisição:', error.response ? error.response.data : error.message);
  }
};

testRequest();
