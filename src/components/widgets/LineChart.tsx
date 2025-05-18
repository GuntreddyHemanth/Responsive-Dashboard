import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { UserActivity } from '../../redux/dashboardSlice';
import { format, parseISO } from 'date-fns';

interface LineChartProps {
  data: UserActivity[];
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 w-full h-full border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsLineChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="date"
              stroke="#9ca3af"
              tickFormatter={(date) => format(parseISO(date), 'MMM dd')}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              formatter={(value) => [`${value} users`, 'Active Users']}
              labelFormatter={(date) => format(parseISO(date as string), 'MMMM d, yyyy')}
              contentStyle={{
                backgroundColor: 'rgba(249, 250, 251, 0.95)',
                borderColor: '#e5e7eb',
                borderRadius: '0.375rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 2 }}
              name="Active Users"
            />
          </RechartsLineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LineChart;