'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as loginService, refreshTokenApiCall, checkEmail ,resetPassword,requestPasswordReset, register as registerService } from '@/services/authService';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const isRefreshing = useRef(false);
  const refreshPromiseRef = useRef(null);
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
    setAuthChecked(true);
  }, []);

  const validateToken = useCallback((token) => {
    try {
      const decodedToken = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp > currentTime;
    } catch (error) {
      console.error('Error decoding token:', error);
      return false;
    }
  }, []);

  useEffect(() => {
    const checkLocalStorage = () => {
      const storedToken = localStorage.getItem('accessToken');
      
    };

    window.addEventListener('storage', checkLocalStorage);
    checkLocalStorage();

    return () => window.removeEventListener('storage', checkLocalStorage);
  }, [token]);

  const refreshAuthToken = useCallback(async () => {
    if (isRefreshing.current || refreshPromiseRef.current) {
      return refreshPromiseRef.current;
    }

    isRefreshing.current = true;
    refreshPromiseRef.current = (async () => {
      try {
        const response = await refreshTokenApiCall();

        if (response.error) {
          handleLogout();
          return false;
        } else {
          const { token } = response;
          if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', token);
            setToken(token);
          }
          return true;
        }
      } catch (error) {
        console.error('Failed to refresh token', error);
        handleLogout();
        return false;
      } finally {
        isRefreshing.current = false;
        refreshPromiseRef.current = null;
      }
    })();

    return refreshPromiseRef.current;
  }, []);

  const checkAuth = useCallback(async () => {
    if (typeof window === 'undefined') return;
  
    const storedToken = localStorage.getItem('accessToken');
    if (!storedToken || !validateToken(storedToken)) {
      const refreshed = await refreshAuthToken();
      if (!refreshed) {
        localStorage.removeItem('accessToken');
        router.push('/login');
        return;
      }
    }
  
    setToken(localStorage.getItem('accessToken'));
    setAuthChecked(true);
  }, [router, validateToken, refreshAuthToken]);

  useEffect(() => {
    let isMounted = true;

    const runCheckAuth = async () => {
      if (!authChecked && isMounted) {
        await checkAuth();
        if (isMounted) {
          const newToken = localStorage.getItem('accessToken');
          setToken(newToken);
          setAuthChecked(true);
        }
      }
    };

    runCheckAuth();

    return () => {
      isMounted = false;
    };
  }, [authChecked, checkAuth]);

  const handleLogin = async (credentials) => {
    const response = await loginService(credentials);
    if (response.error) {
      return { error: true, message: response.message };
    } else {
      const { token } = response;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
      }
      setToken(token);
      return { error: false };
    }
  };

  const handleCheckEmail = async (email) => {
    try {
      const response = await checkEmail(email);
      if (response.code === 200) {
        return { error: false };
      } else {
        return { error: true, message: 'E-mail não registrado.' };
      }
    } catch (error) {
      return { error: true, message: error.response ? error.response.data.message : 'An unexpected error occurred' };
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    setToken(null);
    router.push('/login');
  };

  const scheduleTokenRefresh = useCallback(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expiresIn = decodedToken.exp - (Date.now() / 1000);
      const refreshBuffer = 60; // 60 segundos antes da expiração

      if (expiresIn > refreshBuffer) {
        const refreshTimer = setTimeout(() => {
          
          refreshAuthToken();
        }, (expiresIn - refreshBuffer) * 1000);

        return () => clearTimeout(refreshTimer);
      }
    }
  }, [token, refreshAuthToken]);

  useEffect(() => {
    scheduleTokenRefresh();
  }, [token, scheduleTokenRefresh]);

  const redirectToDashboardIfAuthenticated = useCallback(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken && validateToken(storedToken)) {
      router.push('/dashboard');
    }
  }, [router, validateToken]);


  const handleRegister = async (userData) => {
    try {
      const response = await registerService(userData);
      console.log(response);
      if (response.error) {
        return { error: true, message: response.message };
      } else {
        const { token } = response;
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
        }
        setToken(token);
        return { error: false };
      }
    } catch (error) {
      return { error: true, message: error.message };
    }
  };
  
  const handleNewPassword = async (token, newPassword) => {
    try {
      const response = await resetPassword(token, newPassword);
      if (response.error) {
        return { error: true, message: response.message };
      } else {
        return { error: false };
      }
    } catch (error) {
      return { error: true, message: error.message };
    }
  };

  const handlePasswordReset = async (email,baseUrl) => {
    try {
      const response = await requestPasswordReset(email,baseUrl);
      if (response.error) {
        return { error: true, message: response.message };
      } else {
        return { error: false };
      }
    } catch (error) {
    
      return { error: true, message: error.message };
    }
  }



  return { 
    isAuthenticated: !!token && authChecked, 
    handleLogin, 
    handleLogout, 
    token, 
    authChecked,
    redirectToDashboardIfAuthenticated,
    validateToken,
    handleCheckEmail,
    handleRegister,
    handleNewPassword,
    isAuthenticated,
    handlePasswordReset
  };
};
