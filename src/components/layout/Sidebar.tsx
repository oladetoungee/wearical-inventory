"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, LayoutPanelLeft, CalendarCheck2, ChartBar, Users, ClipboardList, Settings as SettingsIcon, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { logOut } from '@/lib/services/auth';
import { useUser } from '@/lib/hooks';

interface NavItem {
    name: string;
    path: string;
    icon: React.ReactNode;
}

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
    setCurrentPage: (page: string) => void;
}

const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/', icon: <LayoutPanelLeft className="w-5 h-5" /> },
    { name: 'Inventory', path: '/inventory', icon: <CalendarCheck2 className="w-5 h-5" /> },
    { name: 'Manage Sales', path: '/manage-sales', icon: <ClipboardList className="w-5 h-5" /> },
    { name: 'Employees', path: '/employees', icon: <Users className="w-5 h-5" /> },
    { name: 'Sales Record', path: '/sales-record', icon: <ChartBar className="w-5 h-5" /> },
    { name: 'Analytics', path: '/analytics', icon: <ChartBar className="w-5 h-5" /> },
    { name: 'Settings', path: '/settings', icon: <SettingsIcon className="w-5 h-5" /> },
];

const Sidebar = ({ isOpen, toggleSidebar, setCurrentPage }: SidebarProps) => {
    const { userData } = useUser();
    const currentPath = usePathname(); 

    return (
        <div className={`fixed border-r inset-0 z-30 transform transition-transform duration-300 bg-white ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:w-64`}>
            <div className="flex justify-end p-4 md:hidden">
                <button onClick={toggleSidebar}>
                    <X className="w-6 h-6" />
                </button>
            </div>

            <h1 className="text-2xl font-bold text-primary100 leading-4 tracking-wide px-6 md:text-4xl md:pt-8 md:px-8">Wearical</h1>
            <nav className="flex-1 mt-6">
                {navItems.map(item => (
                    <Link
                        key={item.name}
                        href={item.path}
                        className={`flex items-center mx-4 my-2 px-3 py-2 rounded transition-colors duration-200 text-xs hover:bg-primary100 hover:text-white md:mx-8 md:px-4 md:py-3 md:text-sm ${
                            currentPath === item.path ? 'bg-primary100 text-white' : 'hover:bg-gray-600'
                        }`}
                        onClick={() => setCurrentPage(item.name)}
                    >
                        {item.icon}
                        <span className="ml-2">{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3 md:py-4">
                <div className="flex items-center">
                    <Avatar>
                        <AvatarImage src={userData?.avatarUrl} />
                        <AvatarFallback>{userData?.fullName?.charAt(0) || 'U'}</AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-semibold">{userData?.fullName}</p>
                </div>
                <button className="flex items-center text-xs md:text-base" onClick={logOut}>
                    <LogOut className="mr-1" />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
