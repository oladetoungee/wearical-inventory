import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui';
import { Menu } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui';

interface HeaderProps {
    toggleSidebar: () => void;
    role: 'Admin' | 'Sales' | 'Manager';
    currentPage: string; 
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, role, currentPage }) => {
    const roleStyles = {
        Admin: 'text-green100 bg-greenFade',
        Sales: 'text-blue100 bg-blueFade',
        Manager: 'text-orange100 bg-orangeFade',
    };

    return (
        <div className="flex items-center justify-between p-4 bg-white shadow-md">
            {/* Breadcrumbs Section */}
            <div className="flex items-center space-x-2">
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

            {/* Avatar and Role Section */}
            <div className="flex items-center space-x-4">
              
                <div className='flex'> 
                <p className={`px-2 py-1 text-xs font-medium ${roleStyles[role]}`}>
                    {role}
                </p>
                {/* <p className='bg-red100 w-2 h-2 border rounded'></p> */}
                </div>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                
                {/* Sidebar Toggle Button for Mobile */}
                <button onClick={toggleSidebar} className="text-primary100 md:hidden">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </div>
    );
};

export default Header;
