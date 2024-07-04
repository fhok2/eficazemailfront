'use client';
import { useState, useEffect } from 'react';
import { fetchUserEmails, forwardEmail, createEmail, cancelForward,activateForward,updateDataMail} from '../services/emailService';

export const useMail = () => {
  const [userEmails, setUserEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchEmails = async () => {
  //     try {
  //       setLoading(true);
  //       const emails = await fetchUserEmails();
  //       setUserEmails(emails);
  //     } catch (err) {
  //       setError(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchEmails();
  // }, []);

  const forwardUserEmail = async (dataforwardEmail) => {
    try {
      setLoading(true);
      const response = await forwardEmail(dataforwardEmail);
      setUserEmails((prevEmails) => [...prevEmails, response]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const createUserEmail = async (dataMail) => {
    try {
      setLoading(true);
      const response = await createEmail(dataMail);
      setUserEmails((prevEmails) => [...prevEmails, response]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const cancelEmailForward = async (email) => {
    try {
      setLoading(true);
      await cancelForward(email);
      setUserEmails((prevEmails) => prevEmails.filter((userEmail) => userEmail !== email));
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const activateEmailForward = async (dataMail) => {
    try {
      setLoading(true);
      await activateForward(dataMail);
      setUserEmails((prevEmails) => [...prevEmails, dataMail]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    
    }
  }
  const updateEmailForward = async (dataMail) => {
    console.log(dataMail)
    
    try {
      setLoading(true);
      await updateDataMail(dataMail);
      
      setUserEmails((prevEmails) => [...prevEmails, dataMail]);
    } catch (err) {
      console.log(err)
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  return {
    userEmails,
    loading,
    error,
    forwardUserEmail,
    createUserEmail,
    cancelEmailForward,
    activateEmailForward,
    updateEmailForward
  };
};


