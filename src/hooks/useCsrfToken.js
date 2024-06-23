// hooks/useCsrfToken.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3005/api';
// const baseURL = 'https://emailpix.up.railway.app/api';

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    console.log('useCsrfToken useEffect');
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`${baseURL}/csrf/get-csrf-token`, { withCredentials: true });
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};
