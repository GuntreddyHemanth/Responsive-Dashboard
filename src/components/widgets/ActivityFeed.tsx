import React from 'react';
import { ActivityItem } from '../../redux/dashboardSlice';
import { format, parseISO } from 'date-fns';

interface ActivityFeedProps {
  activities: ActivityItem[];
  title: string;
}

const ActivityFeed: React.FC<ActivityFeedProps> = ({ activities, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 w-full h-full border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="space-y-4 overflow-y-auto max-h-[250px] pr-2">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="p-3 border border-gray-100 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-800 text-primary-600 dark:text-primary-200 flex items-center justify-center mr-3">
                {activity.user.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">
                  <span className="font-semibold">{activity.user}</span> {activity.action}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {format(parseISO(activity.timestamp), 'MMM d, h:mm a')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;