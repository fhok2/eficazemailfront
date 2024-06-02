'use client'
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useCsrfToken } from '../hooks/useCsrfToken';

const AddCookierToken = ({ children }) => {
  const csrfToken = useCsrfToken();

  useEffect(() => {
    if (csrfToken) {
      Cookies.set('_csrf', csrfToken);
    }
  }, [csrfToken]);

  return <>{children}</>;
};

export default AddCookierToken;