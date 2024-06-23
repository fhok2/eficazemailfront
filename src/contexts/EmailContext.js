import React, { createContext, useContext } from 'react';
import {useMail} from '@/hooks/useMail';

const EmailContext = createContext();


export const EmailProvider = ({ children }) => {
  const emailData = useMail();

  return <EmailContext.Provider value={emailData}>{children}</EmailContext.Provider>;
};

export const useEmailContext = () => useContext(EmailContext);