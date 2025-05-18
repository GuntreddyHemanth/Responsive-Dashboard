import React, { useRef, useEffect } from 'react';
import { 
  Home, 
  BarChart3, 
  Settings, 
  Users, 
  Calendar, 
  MessageSquare, 
  HelpCircle, 
  X 
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  activePage: 'dashboard' | 'settings';
  setActivePage: (page: 'dashboard' | 'settings') => void;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activePage, setActivePage, onClose }) => {
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close sidebar on mobile
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && window.innerWidth < 768) {
        onClose();
      }
    }

    if (isOpen && window.innerWidth < 768) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, text: 'Overview' },
    { id: 'analytics', icon: <BarChart3 size={20} />, text: 'Analytics', disabled: true },
    { id: 'users', icon: <Users size={20} />, text: 'Users', disabled: true },
    { id: 'calendar', icon: <Calendar size={20} />, text: 'Calendar', disabled: true },
    { id: 'messages', icon: <MessageSquare size={20} />, text: 'Messages', disabled: true },
    { id: 'settings', icon: <Settings size={20} />, text: 'Settings' },
  ];

  // Mobile overlay
  const overlay = (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    />
  );

  return (
    <>
      {overlay}
      <aside
        ref={sidebarRef}
        className={`fixed md:relative h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 z-30 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-md bg-primary-500 flex items-center justify-center text-white mr-2">
                <BarChart3 className="h-5 w-5" />
              </div>
              <h2 className="text-lg font-semibold">DashPro</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden"
              aria-label="Close sidebar"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      if (!item.disabled && (item.id === 'dashboard' || item.id === 'settings')) {
                        setActivePage(item.id as 'dashboard' | 'settings');
                        if (window.innerWidth < 768) onClose();
                      }
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${
                      activePage === item.id
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    } ${item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    disabled={item.disabled}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.text}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <button className="w-full flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
              <HelpCircle size={20} className="mr-3" />
              <span>Help & Support</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;