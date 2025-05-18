import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  iconBackground: string;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  icon: Icon,
  iconBackground,
  iconColor,
}) => {
  const isPositive = change >= 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md">
      <div className="flex items-start">
        <div className={`p-2 rounded-lg ${iconBackground} ${iconColor} mr-4`}>
          <Icon size={18} />
        </div>
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <p className="text-2xl font-semibold mt-1">{value}</p>
          <div className="flex items-center mt-1">
            <span
              className={`text-xs font-medium ${
                isPositive ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
              }`}
            >
              {isPositive ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatCard;