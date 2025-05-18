import { DashboardData } from '../redux/dashboardSlice';

// Simulating API response delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Mock data for dashboard
export const fetchDashboardDataFromApi = async (): Promise<Omit<DashboardData, 'loading' | 'error'>> => {
  // Simulate network request
  await delay(800);

  // Mock data for user activity chart (line chart)
  const userActivity = [
    { date: '2025-01-01', value: 400 },
    { date: '2025-01-02', value: 300 },
    { date: '2025-01-03', value: 500 },
    { date: '2025-01-04', value: 280 },
    { date: '2025-01-05', value: 590 },
    { date: '2025-01-06', value: 350 },
    { date: '2025-01-07', value: 480 },
  ];

  // Mock data for sales chart (bar chart)
  const salesData = [
    { category: 'Electronics', value: 4000 },
    { category: 'Clothing', value: 3000 },
    { category: 'Books', value: 2000 },
    { category: 'Home', value: 2780 },
    { category: 'Beauty', value: 1890 },
    { category: 'Sports', value: 2390 },
  ];

  // Mock data for demographics (pie chart)
  const demographics = [
    { name: '18-24', value: 2400 },
    { name: '25-34', value: 4567 },
    { name: '35-44', value: 1398 },
    { name: '45-54', value: 9800 },
    { name: '55+', value: 3908 },
  ];

  // Mock data for recent activity feed
  const recentActivity = [
    {
      id: '1',
      user: 'Alex Johnson',
      action: 'Created a new report',
      timestamp: '2025-01-07T14:32:00Z',
    },
    {
      id: '2',
      user: 'Sarah Smith',
      action: 'Updated user profile',
      timestamp: '2025-01-07T13:45:00Z',
    },
    {
      id: '3',
      user: 'Michael Brown',
      action: 'Made a purchase of $299',
      timestamp: '2025-01-07T11:20:00Z',
    },
    {
      id: '4',
      user: 'Emily Davis',
      action: 'Created a new account',
      timestamp: '2025-01-07T10:05:00Z',
    },
    {
      id: '5',
      user: 'Robert Wilson',
      action: 'Subscribed to premium plan',
      timestamp: '2025-01-06T22:15:00Z',
    },
  ];

  return {
    userActivity,
    salesData,
    demographics,
    recentActivity,
  };
};

// Mock API for saving settings
export const saveUserSettings = async (settings: any): Promise<{ success: boolean }> => {
  await delay(1000);
  
  // Simulate success (or occasionally an error for testing)
  const success = Math.random() > 0.1;
  
  if (!success) {
    throw new Error('Network error occurred while saving settings');
  }
  
  return { success: true };
};