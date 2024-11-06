"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('Dashboard'); // Default to 'Dashboard'

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setCurrentPage={setCurrentPage} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} role='Admin' currentPage={currentPage} /> {/* Pass currentPage */}
        <div className="p-4 flex-1 overflow-y-auto">
          {children} 
        </div>
      </div>
    </div>
  );
};
