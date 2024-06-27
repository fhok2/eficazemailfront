import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const CsrfContext = createContext();

export const useCsrfToken = () => {
  return useContext(CsrfContext);
};

// const baseURL = "http://localhost:3005/api"; 
const baseURL = 'https://emailpix.up.railway.app/api';

export const CsrfProvider = ({ children }) => {
  const [csrfToken, setCsrfToken] = useState(Cookies.get('XSRF-TOKEN') || '');
  const fetchedRef = useRef(false);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      if (fetchedRef.current) return; // Evita múltiplas requisições
      fetchedRef.current = true;

      try {
        const response = await axios.get(`${baseURL}/csrf/get-csrf-token`, { withCredentials: true });
        const token = response.data.csrfToken;
        setCsrfToken(token);
        Cookies.set('XSRF-TOKEN', token, { 
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
          expires: new Date(Date.now() + 30000) // 30 seconds
        });
      } catch (error) {
        console.error('Error fetching CSRF token:', error);
      }
    };

    if (!csrfToken) {
      fetchCsrfToken();
    }
  }, []); // Removida a dependência de csrfToken

  return (
    <CsrfContext.Provider value={csrfToken}>
      {children}
    </CsrfContext.Provider>
  );
};