import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import LineChart from '../components/widgets/LineChart';
import BarChart from '../components/widgets/BarChart';
import PieChart from '../components/widgets/PieChart';
import ActivityFeed from '../components/widgets/ActivityFeed';
import StatCard from '../components/widgets/StatCard';
import { Users, ShoppingCart, CreditCard, TrendingUp } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { userActivity, salesData, demographics, recentActivity, loading, error } = useSelector(
    (state: RootState) => state.dashboard
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="bg-error-50 dark:bg-error-900/20 text-error-600 dark:text-error-400 p-4 rounded-lg">
          <p>Error loading dashboard data. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>
      
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value="13,849"
          change={12.5}
          icon={Users}
          iconBackground="bg-primary-100 dark:bg-primary-800/50"
          iconColor="text-primary-600 dark:text-primary-300"
        />
        <StatCard
          title="Sales"
          value="$48,592"
          change={8.2}
          icon={ShoppingCart}
          iconBackground="bg-accent-100 dark:bg-accent-800/50"
          iconColor="text-accent-600 dark:text-accent-300"
        />
        <StatCard
          title="Revenue"
          value="$24,738"
          change={-3.1}
          icon={CreditCard}
          iconBackground="bg-success-100 dark:bg-success-800/50"
          iconColor="text-success-600 dark:text-success-300"
        />
        <StatCard
          title="Conversion Rate"
          value="3.24%"
          change={1.2}
          icon={TrendingUp}
          iconBackground="bg-warning-100 dark:bg-warning-800/50"
          iconColor="text-warning-600 dark:text-warning-300"
        />
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart data={userActivity} title="User Activity" />
        <BarChart data={salesData} title="Sales by Category" />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PieChart data={demographics} title="User Demographics" />
        <ActivityFeed activities={recentActivity} title="Recent Activity" />
      </div>
    </div>
  );
};

export default Dashboard;