import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SalesData } from '../../redux/dashboardSlice';

interface BarChartProps {
  data: SalesData[];
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ data, title }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 w-full h-full border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium mb-4">{title}</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsBarChart
            data={data}
            margin={{ top: 5, right: 10, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="category"
              stroke="#9ca3af"
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              formatter={(value) => [`$${value}`, 'Sales']}
              contentStyle={{
                backgroundColor: 'rgba(249, 250, 251, 0.95)',
                borderColor: '#e5e7eb',
                borderRadius: '0.375rem',
              }}
            />
            <Bar
              dataKey="value"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
              name="Sales"
            />
          </RechartsBarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BarChart;