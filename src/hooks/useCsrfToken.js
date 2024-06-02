// hooks/useCsrfToken.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'https://emailpix.up.railway.app/api';

export const useCsrfToken = () => {
  const [csrfToken, setCsrfToken] = useState('');

  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await axios.get(`${baseURL}/csrf/get-csrf-token`);
        setCsrfToken(response.data.csrfToken);
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    fetchCsrfToken();
  }, []);

  return csrfToken;
};