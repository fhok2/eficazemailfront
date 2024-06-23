"use client";

import { useEffect, useRef, useState } from "react";
import Layout from "@/components/dashboardComponents/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import { fetchUserEmails } from "@/services/emailService";
import EmailTable from "@/components/dashboardComponents/EmailTable";
import Pagination from "@/components/dashboardComponents/Pagination";
import { useAuthContext } from "@/contexts/AuthContext";
import CreateRedirect from "@/components/CreateRedirect";
import { jwtDecode } from "jwt-decode";

export default function Dashboard() {
  const { token, authChecked } = useAuthContext();
  const [emails, setEmails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRedirects, setTotalRedirects] = useState(0);
  const limit = 10;
  const isFirstRender = useRef(true);
  const [email, setEmail] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem("emailData");
    if (storedData) {
      const { emails, pagination, totalRedirects } = JSON.parse(storedData);
      setEmails(emails);
      setTotalPages(pagination.totalPages);
      setTotalRedirects(totalRedirects);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleEmailDataUpdate = () => {
      const storedData = localStorage.getItem("emailData");
      if (storedData) {
        const { emails, pagination, totalRedirects } = JSON.parse(storedData);
        setEmails(emails);
        setTotalPages(pagination.totalPages);
        setTotalRedirects(pagination.totalEmails);
        setIsLoading(false);
      }
    };

    window.addEventListener('emailDataUpdated', handleEmailDataUpdate);

    return () => {
      window.removeEventListener('emailDataUpdated', handleEmailDataUpdate);
    };
  }, []);

  const loadEmails = async () => {
    if (token && authChecked) {
      setIsLoading(true);
      try {
        const response = await fetchUserEmails(currentPage, limit);
        setEmails(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalRedirects(response.pagination.totalEmails);
        localStorage.setItem(
          "emailData",
          JSON.stringify({
            emails: response.data,
            pagination: response.pagination,
            totalRedirects: response.pagination.totalEmails,
          })
        );
      } catch (error) {
        console.error("Failed to fetch emails:", error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    loadEmails();
  }, [currentPage, limit, token, authChecked]);

  useEffect(() => {
    if (token && authChecked) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token, authChecked]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="gap-4 bg-slate-300 flex flex-col justify-center">
          <div className="bg-white p-4 rounded-lg xs:mb-4 max-w-full flex flex-col shadow-md">
            <div className="flex flex-wrap justify-around h-full">
              <div className="flex flex-1 flex-col items-center justify-center p-4 space-y-2 bg-gradient-to-r from-brand-dark-600 to-brand-light rounded-lg border border-gray-200 m-2">
                <h2 className="text-4xl font-bold text-gray-50 text-center">
                  {totalRedirects}
                </h2>
                <p className="text-white">Total redirecionamento</p>
              </div>
              <div className="flex-1 flex my-auto  ">
                {email && <CreateRedirect email={email} />}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md my-4">
          {isLoading ? (
            <div className="flex justify-center items-center">
              <p>Loading...</p>
            </div>
          ) : (
            <EmailTable
              isLoading={isLoading}
              emails={emails}
              loadEmails={loadEmails}
            />
          )}
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageClick}
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}