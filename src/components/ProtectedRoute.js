"use client";
import React, { useEffect } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import LoadingScreen from './LoadingScreen ';

const ProtectedRoute = ({ children, isLoading }) => {
  const { isAuthenticated, authChecked } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (authChecked && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authChecked, isAuthenticated, router]);
  

  if (!authChecked || isLoading) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? children : null;
};

export default ProtectedRoute;
