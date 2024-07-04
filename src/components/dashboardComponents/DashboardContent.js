import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Users, BarChart, Plus, RefreshCw } from "lucide-react";
import { fetchUserEmails } from "@/services/emailService";
import EmailTable from "@/components/dashboardComponents/EmailTable";
import Pagination from "@/components/dashboardComponents/Pagination";
import { useAuthContext } from "@/contexts/AuthContext";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CreateRedirect from "@/components/CreateRedirect";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";


const statusTranslation = {
  active: "Ativo",
  inactive: "Inativo",
  deleted: "Deletado",
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip bg-background border border-border p-2 rounded-md shadow-lg">
        <p className="label font-semibold">{`${label}`}</p>
        <p className="intro">{`Quantidade: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function DashboardContent() {
  const { token, authChecked } = useAuthContext();
  const [emails, setEmails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEmails, setTotalEmails] = useState(0);
  const [totalRedirects, setTotalRedirects] = useState(0);
  const [chartData, setChartData] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);
  const { theme } = useTheme();
  const limit = 10;
  const [isCreateRedirectOpen, setIsCreateRedirectOpen] = useState(false);

  const handleOpenCreateRedirect = () => {
    setIsCreateRedirectOpen(true);
  };

  const handleCloseCreateRedirect = () => {
    setIsCreateRedirectOpen(false);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("emailData");
    if (storedData) {
      const { emails, pagination, totalRedirects } = JSON.parse(storedData);
      setEmails(emails);
      setTotalPages(pagination.totalPages);
      setTotalEmails(pagination.totalEmails);
      setTotalRedirects(totalRedirects);
      setIsLoading(false);

      updateChartData(emails);
    }
  }, []);

  const updateChartData = (emailData) => {
    const statusCount = emailData.reduce((acc, email) => {
      const translatedStatus = statusTranslation[email.status] || email.status;
      acc[translatedStatus] = (acc[translatedStatus] || 0) + 1;
      return acc;
    }, {});
    setChartData(
      Object.entries(statusCount).map(([status, count]) => ({ status, count }))
    );
  };

  const loadEmails = async () => {
    if (token && authChecked) {
      setIsLoading(true);
      try {
        const response = await fetchUserEmails(currentPage, limit);
        setEmails(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalEmails(response.pagination.totalEmails);
        setTotalRedirects(response.pagination.totalEmails);

        updateChartData(response.data);

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
    loadEmails();
  }, [currentPage, token, authChecked, refreshKey]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

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
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-primary text-primary-foreground">
              <CardTitle className="text-sm font-medium">
                Total Emails
              </CardTitle>
              <Mail className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{totalEmails}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-secondary text-secondary-foreground">
              <CardTitle className="text-sm font-medium">
                Total Redirecionamentos
              </CardTitle>
              <Users className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">{totalRedirects}</div>
            </CardContent>
          </Card>
        </motion.div>
        <motion.div variants={cardVariants}>
          <Card className="overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-accent text-accent-foreground">
              <CardTitle className="text-sm font-medium">
                Emails Ativos
              </CardTitle>
              <BarChart className="h-4 w-4" />
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {emails.filter((email) => email.status === "active").length}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Status dos Emails</CardTitle>
            <button
              onClick={handleRefresh}
              className="p-2 rounded-full hover:bg-accent"
            >
              <RefreshCw className="h-5 w-5" />
            </button>
          </CardHeader>
          <CardContent className="pl-2">
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBarChart data={chartData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={theme === "dark" ? "#374151" : "#e5e7eb"}
                />
                <XAxis
                  dataKey="status"
                  stroke={theme === "dark" ? "#9CA3AF" : "#4B5563"}
                />
                <YAxis
                  allowDecimals={false}
                  stroke={theme === "dark" ? "#9CA3AF" : "#4B5563"}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="rgb(9 182 162)" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
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
            <motion.button
  onClick={handleOpenCreateRedirect}
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
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
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
          </CardContent>
        </Card>
      </motion.div>
      <CreateRedirect
        isOpen={isCreateRedirectOpen}
        onClose={handleCloseCreateRedirect}
      />
    </div>
  );
}

export default DashboardContent;
