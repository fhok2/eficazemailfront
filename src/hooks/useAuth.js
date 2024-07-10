'use client';
import { useState, useEffect, useCallback, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { login as loginService, refreshTokenApiCall, checkEmail, resetPassword, requestPasswordReset, register as registerService, loginWithGoogle,logout } from '@/services/authService';
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
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const response = await refreshTokenApiCall(refreshToken);

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
    
    if (storedToken) {
      if (validateToken(storedToken)) {
        // Token válido, apenas atualize o estado
        setToken(storedToken);
      } else {
        // Token expirado, tente refresh
        const refreshed = await refreshAuthToken();
        if (!refreshed) {
          localStorage.removeItem('accessToken');
          router.push('/login');
          return;
        }
      }
    } else {
      // Não há token, não tente refresh
      router.push('/login');
      return;
    }
  
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
   
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('refreshToken', response.refreshToken);
      }
      setToken(token);
      return { error: false };
    }
  };

  const handleCheckEmail = async (email) => {
    const removeSpace = email.replace(/\s/g, '');
    const response = await checkEmail(removeSpace);
  
      if (response.code === 200) {
        return { error: false };
      } else {
        return { error: true, message: response.message || 'E-mail não registrado.' };
      }
  };

  const handleLogout = async () => {

    const result = await logout();
  
    setToken(null);
    router.push('/login');
  };

  const scheduleTokenRefresh = useCallback(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expiresIn = decodedToken.exp - (Date.now() / 1000);
      const refreshBuffer = 60; // 60 segundos antes da expiração
  
      if (expiresIn > refreshBuffer) {
        const refreshTimer = setTimeout(async () => {
          const refreshed = await refreshAuthToken();
          if (refreshed) {
            // Token refreshed successfully, update the state
            setToken(localStorage.getItem('accessToken'));
          }
        }, (expiresIn - refreshBuffer) * 1000);
  
        return () => clearTimeout(refreshTimer);
      }
    }
  }, [token, refreshAuthToken]);

  useEffect(() => {
    scheduleTokenRefresh();
  }, [token, scheduleTokenRefresh]);

  const handleGoogleSignIn = async () => {
    try {
      const response = await loginWithGoogle();
      if (response.error) {
        return { error: response.message };
      } else {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', response.token);
          localStorage.setItem('refreshToken', response.refreshToken);
        }
        setToken(response.token);
        setIsAuthenticated(true);
        return { error: false };
      }
    } catch (error) {
      return { error: error.message };
    }
  };

  const redirectToDashboardIfAuthenticated = useCallback(async () => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      if (validateToken(storedToken)) {
        setToken(storedToken);
        setIsAuthenticated(true);
        router.push('/dashboard');
      } else {
        // Token expirado, tente refresh
        const refreshed = await refreshAuthToken();
        if (refreshed) {
          const newToken = localStorage.getItem('accessToken');
          setToken(newToken);
          setIsAuthenticated(true);
          router.push('/dashboard');
        } else {
          // Se o refresh falhar, limpe o token e redirecione para o login
          localStorage.removeItem('accessToken');
          setToken(null);
          setIsAuthenticated(false);
          router.push('/login');
        }
      }
    }
  }, [router, validateToken, refreshAuthToken]);

  // const redirectToDashboardIfAuthenticated = useCallback(() => {
  //   const storedToken = localStorage.getItem('accessToken');
  //   if (storedToken && validateToken(storedToken)) {
  //     router.push('/dashboard');
  //   }
  // }, [router, validateToken]);


  const handleRegister = async (userData) => {
    try {
      const response = await registerService(userData);
      
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
    handlePasswordReset,
    handleGoogleSignIn
  };
};
