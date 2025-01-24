import React from 'react';
import { WeeklyChart, MonthlySalesChart } from '@/components/analytics';


export const DashboardCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-6">
       
  <MonthlySalesChart />
  <WeeklyChart />
 
    </div>
  );
};
