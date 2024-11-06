import React from 'react';
import { Menu } from 'lucide-react';

interface HamburgerMenuProps {
  toggleSidebar: () => void;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ toggleSidebar }) => {
  return (
    <button onClick={toggleSidebar} className="md:hidden p-2 text-gray-800">
      <Menu className="w-6 h-6" />
    </button>
  );
};

export default HamburgerMenu;
