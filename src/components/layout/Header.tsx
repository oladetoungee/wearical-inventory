'use client'
import React from 'react';
import { Menu } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,  Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { useUser } from '@/lib/hooks';
import {  ROLE_COLORS } from '@/lib/utils';

interface HeaderProps {
    toggleSidebar: () => void;
    currentPage: string; 
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, currentPage }) => {
    const { userData, loading } = useUser();

  
    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="flex items-center space-x-2 hidden md:block">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{currentPage}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
        </div>
        <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center space-x-2">
                {/* Role (if available) */}
                {userData?.role && (
                    <p
                        className={`px-2 py-1 rounded-lg text-[10px] font-medium ${
                            ROLE_COLORS[userData.role]
                        }`}
                    >
                        {userData.role}
                    </p>
                )}
                {/* Avatar */}
                <Avatar>
                    <AvatarImage src={userData?.avatarUrl} />
                    <AvatarFallback>{userData?.fullName?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
            </div>
    
            {/* Menu Icon (Visible on smaller screens) */}
            <button onClick={toggleSidebar} className="text-primary100 md:hidden">
                <Menu className="w-6 h-6" />
            </button>
        </div>

        {/* <div className="hidden md:flex items-center space-x-4">
            <div className="flex flex-col items-end text-right">
                {loading ? (
                    <Spinner />
                ) : userData ? (
                    <div className="hidden sm:block">
                        <p className="text-sm font-semibold">{userData.fullName}</p>
                        <p className="text-xs text-gray-500">{userData.email}</p>
                    </div>
                ) : null}
            </div>
        </div> */}
    </div>
    
    );
};

export default Header;
