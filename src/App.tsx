import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from './redux/themeSlice';
import { fetchDashboardData } from './redux/dashboardSlice';
import { RootState, AppDispatch } from './redux/store';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

function App() {
  const [activePage, setActivePage] = useState<'dashboard' | 'settings'>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 768);
  const { darkMode } = useSelector((state: RootState) => state.theme);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Apply dark mode class to the html element
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    // Fetch dashboard data on initial load
    dispatch(fetchDashboardData());

    // Handle window resize for sidebar visibility
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleToggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Header
        onToggleSidebar={handleToggleSidebar}
        onToggleTheme={handleToggleTheme}
        darkMode={darkMode}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={sidebarOpen}
          activePage={activePage}
          setActivePage={setActivePage}
          onClose={() => window.innerWidth < 768 && setSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'settings' && <Settings />}
        </main>
      </div>
    </div>
  );
}

export default App;