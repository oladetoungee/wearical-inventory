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
     
        <div className="flex-1 overflow-y-auto  m-6">
        <h1 className='text-primary100 text-xl font-bold p-0 m-0'>{currentPage}</h1>
          {children} 
        </div>
      </div>
    </div>
  );
};
