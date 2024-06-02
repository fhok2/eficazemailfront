import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://emailpix.up.railway.app/api';
// const baseURL = 'http://localhost:3005/api';

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const csrfCookie = document.cookie.split('; ').find(row => row.startsWith('_csrf='));
        if (csrfCookie) {
          const token = csrfCookie.split('=')[1];
          setCsrfToken(token);
          axios.defaults.headers.common['X-CSRF-Token'] = token;
        } else {
          const response = await axios.get(`${baseURL}/csrf/get-csrf-token`, { withCredentials: true });
          const token = response.data.csrfToken;
          setCsrfToken(token);
          axios.defaults.headers.common['X-CSRF-Token'] = token;
          Cookies.set('_csrf', token, { path: '/', sameSite: 'None' }); // Criar o cookie _csrf aqui
        }
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};