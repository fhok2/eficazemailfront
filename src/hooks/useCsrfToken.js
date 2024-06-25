// hooks/useCsrfToken.js
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
        let token = Cookies.get('XSRF-TOKEN'); // Obtém o token CSRF do cookie

        if (!token) {
          const response = await axios.get(`${baseURL}/csrf/get-csrf-token`, { withCredentials: true });
          token = response.data.csrfToken;
          Cookies.set('XSRF-TOKEN', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        }

        setCsrfToken(token);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};

