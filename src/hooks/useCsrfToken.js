// hooks/useCsrfToken.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

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