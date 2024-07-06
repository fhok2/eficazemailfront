'use client';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { EmailProvider } from '@/contexts/EmailContext';
import AnimatedBackground from '@/components/AnimatedBackground';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <EmailProvider>
      <AnimatedBackground />
        {children}
      </EmailProvider>
    </AuthProvider>
  );
}
