"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { usePathname } from 'next/navigation'; 
import { useEffect } from 'react';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<string>('Dashboard');
  const currentPath = usePathname(); 


  useEffect(() => {
    const pageMapping: { [key: string]: string } = {
      '/': 'Dashboard',
      '/inventory': 'Inventory',
      '/sales': 'Sales',
      '/employees': 'Employees',
      '/analytics': 'Analytics',
      '/settings': 'Settings',
    };

    setCurrentPage(pageMapping[currentPath] || 'Dashboard');
  }, [currentPath]); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
<div className="flex h-screen overflow-hidden">
  <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
  <div className="flex-1 flex flex-col overflow-hidden">
    <Header toggleSidebar={toggleSidebar} currentPage={currentPage} />
    <div className="flex-1 overflow-y-auto m-6 max-w-full max-h-full">
      <h1 className="text-primary100 text-xl font-bold truncate">{currentPage}</h1>
      <div className="max-w-full max-h-full overflow-auto">
        {children}
      </div>
    </div>
  </div>
</div>

  );
};
