'use client';
import React from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import { EmailProvider } from '@/contexts/EmailContext';

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <EmailProvider>
        {children}
      </EmailProvider>
    </AuthProvider>
  );
}
