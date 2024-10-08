'use client'
import React, { useEffect, useState, useCallback, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, XCircle, RefreshCw, Plus, Loader } from "lucide-react";
import { fetchUserEmails } from "@/services/emailService";
import EmailTable from "@/components/dashboardComponents/EmailTable";
import Pagination from "@/components/dashboardComponents/Pagination";
import { useAuthContext } from "@/contexts/AuthContext";
import CreateRedirect from "@/components/CreateRedirect";
import { motion } from "framer-motion";

function DashboardContent() {
  const { token, authChecked } = useAuthContext();
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isStatsLoading, setIsStatsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [emailStats, setEmailStats] = useState({
    total: 0,
    active: 0,
    inactive: 0
  });
  const [refreshKey, setRefreshKey] = useState(0);
  const limit = 10;
  const [isCreateRedirectOpen, setIsCreateRedirectOpen] = useState(false);

  // Add a ref to store the previous email data
  const prevEmailDataRef = useRef(null);

  const updateLocalStorage = useCallback((newData) => {
    localStorage.setItem("emailData", JSON.stringify(newData));
  }, []);

  const getLocalStorageData = useCallback(() => {
    const storedData = localStorage.getItem("emailData");
    return storedData ? JSON.parse(storedData) : null;
  }, []);

  const loadEmails = useCallback(async () => {
    if (token && authChecked) {
      setIsLoading(true);
      setIsStatsLoading(true);
      try {
        const response = await fetchUserEmails(currentPage, limit);
        const newData = {
          data: response.data || [],
          pagination: response.pagination || {},
          stats: response.stats || {},
        };
        setEmails(newData.data);
        setTotalPages(newData.pagination.totalPages || 1);
        setEmailStats({
          total: newData.stats.total || 0,
          active: newData.stats.ativos || 0,
          inactive: newData.stats.inativos || 0
        });
        updateLocalStorage(newData);
      } catch (error) {
        console.error("Error loading emails:", error);
      }
      setIsLoading(false);
      setIsStatsLoading(false);
    }
  }, [token, authChecked, currentPage, limit, updateLocalStorage]);

  useEffect(() => {
    loadEmails();
  }, [currentPage, token, authChecked, refreshKey, loadEmails]);

  // Add a new effect to listen for the custom event
  useEffect(() => {
    const handleEmailDataUpdated = () => {
      const storedData = getLocalStorageData();
      if (storedData) {
        setEmails(storedData.data || []);
        setTotalPages(storedData.pagination?.totalPages || 1);
        setEmailStats({
          total: storedData.stats?.total || 0,
          active: storedData.stats?.ativos || 0,
          inactive: storedData.stats?.inativos || 0
        });
      }
    };

    window.addEventListener('emailDataUpdated', handleEmailDataUpdated);

    return () => {
      window.removeEventListener('emailDataUpdated', handleEmailDataUpdated);
    };
  }, [getLocalStorageData]);

  useEffect(() => {
    loadEmails();
  }, [currentPage, token, authChecked, refreshKey, loadEmails]);

  // Add a new effect to monitor localStorage changes
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "emailData") {
        const newData = JSON.parse(e.newValue);
        if (newData && JSON.stringify(newData) !== JSON.stringify(prevEmailDataRef.current)) {
          setEmails(newData.data || []);
          setTotalPages(newData.pagination?.totalPages || 1);
          setEmailStats({
            total: newData.stats?.total || 0,
            active: newData.stats?.ativos || 0,
            inactive: newData.stats?.inativos || 0
          });
          prevEmailDataRef.current = newData;
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleCreateRedirect = useCallback((newEmail) => {
    setIsCreateRedirectOpen(false);
    loadEmails();
  }, [loadEmails]);

  const handlePageClick = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleRefresh = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1);
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const renderStatCard = (title, value, icon, bgColor) => (
    <motion.div variants={cardVariants}>
      <Card className="overflow-hidden">
        <CardHeader className={`flex flex-row items-center justify-between space-y-0 pb-2 ${bgColor} text-primary-foreground`}>
          <CardTitle className="text-sm font-medium">
            {title}
          </CardTitle>
          {icon}
        </CardHeader>
        <CardContent className="pt-4">
          {isStatsLoading ? (
            <div className="flex justify-center items-center h-8">
              <Loader className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="text-2xl font-bold">{value}</div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );

  return (
    <div className="space-y-4">
      <motion.div
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {renderStatCard("Total Emails", emailStats.total, <Mail className="h-4 w-4" />, "bg-primary")}
        {renderStatCard("Emails Ativos", emailStats.active, <CheckCircle className="h-4 w-4" />, "bg-green-500")}
        {renderStatCard("Emails Inativos", emailStats.inactive, <XCircle className="h-4 w-4" />, "bg-yellow-500")}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>
              <span className="text-sm sm:text-lg md:text-xl lg:text-xl ">
                Lista de Emails
              </span>
            </CardTitle>
            <div className="flex space-x-2">
              <motion.button
                onClick={handleRefresh}
                className="p-2 rounded-full hover:bg-accent"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw className="h-5 w-5" />
              </motion.button>
              <motion.button
                onClick={() => setIsCreateRedirectOpen(true)}
                className="group flex items-center justify-center space-x-1 sm:space-x-2 bg-primary text-primary-foreground px-2 sm:px-3 md:px-4 py-1 sm:py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out text-xs sm:text-sm md:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  className="relative"
                  initial={{ rotate: 0 }}
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                >
                  <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
                </motion.span>
                <motion.span className="font-medium hidden xs:inline">
                  <span className="hidden sm:inline">Novo </span>
                  Redirecionamento
                </motion.span>
              </motion.button>
            </div>
          </CardHeader>
          <CardContent>
            <EmailTable
              isLoading={isLoading}
              emails={emails}
              loadEmails={loadEmails}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageClick}
            />
          </CardContent>
        </Card>
      </motion.div>
      <CreateRedirect
        isOpen={isCreateRedirectOpen}
        onClose={() => setIsCreateRedirectOpen(false)}
        onCreateSuccess={handleCreateRedirect}
      />
    </div>
  );
}

export default DashboardContent;