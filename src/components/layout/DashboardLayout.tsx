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
      '/manage-sales': 'Manage Sales',
      '/employees': 'Employees',
      '/sales-record': 'Sales Record',
      '/analytics': 'Analytics',
      '/settings': 'Settings',
    };

    setCurrentPage(pageMapping[currentPath] || 'Dashboard');
  }, [currentPath]); 

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header toggleSidebar={toggleSidebar} currentPage={currentPage} />
        <div className="flex-1 overflow-y-auto m-6">
          <h1 className="text-primary100 text-xl font-bold p-0 m-0">{currentPage}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};
