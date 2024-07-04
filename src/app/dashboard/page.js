'use client'

import React, { useState } from "react";
import Layout from "@/components/dashboardComponents/Layout";
import ProtectedRoute from "@/components/ProtectedRoute";
import DashboardContent from "@/components/dashboardComponents/DashboardContent";
import CreateRedirect from "@/components/CreateRedirect";

export default function Dashboard() {
  const [isCreateRedirectOpen, setIsCreateRedirectOpen] = useState(false);

  const openCreateRedirect = () => {
    setIsCreateRedirectOpen(true);
  };

  const closeCreateRedirect = () => {
    setIsCreateRedirectOpen(false);
  };

  return (
    <ProtectedRoute>
      <Layout>
        {(currentPage) => {
          switch (currentPage) {
            case 'dashboard':
              return <DashboardContent openCreateRedirect={openCreateRedirect} />;
            case 'account':
              return <div>Account Component</div>; // Replace with actual component
            default:
              return <DashboardContent openCreateRedirect={openCreateRedirect} />;
          }
        }}
      </Layout>
      {isCreateRedirectOpen && <CreateRedirect isOpen={isCreateRedirectOpen} onClose={closeCreateRedirect} />}
    </ProtectedRoute>
  );
}
