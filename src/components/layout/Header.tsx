import React from 'react';
import { Menu, Bell, Sun, Moon, User } from 'lucide-react';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleTheme: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar, onToggleTheme, darkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm z-10 transition-colors duration-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            onClick={onToggleSidebar}
            className="p-2 mr-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 md:hidden"
            aria-label="Toggle sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <h1 className="font-bold text-xl text-primary-600 dark:text-primary-400 hidden sm:block">
            Analytics Dashboard
          </h1>
          <h1 className="font-bold text-xl text-primary-600 dark:text-primary-400 sm:hidden">
            Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          <button
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 relative"
            aria-label="View notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-error-500"></span>
          </button>
          <button
            className="flex items-center ml-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full p-1 transition-colors duration-200"
            aria-label="User profile"
          >
            <div className="relative w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-700 flex items-center justify-center text-primary-700 dark:text-primary-100">
              <User className="h-5 w-5" />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;