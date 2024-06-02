import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const baseURL = 'https://emailpix.up.railway.app/api';

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        let token = Cookies.get('_csrf');

        if (!token) {
          const response = await axios.get(`${baseURL}/csrf/get-csrf-token`, { withCredentials: true });
          token = response.data.csrfToken;
          Cookies.remove('_csrf', { path: '/' });
          Cookies.set('_csrf', token, { path: '/', sameSite: 'None', secure: true });
        }

        setCsrfToken(token);
        axios.defaults.headers.common['X-CSRF-Token'] = token;
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};