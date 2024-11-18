import React from 'react';
import { ChartLine, ChartBar } from '../ui';


export const DashboardCharts: React.FC = () => {
  return (
    <div className=" mt-4 space-y-4">
       
  <ChartLine />
  <ChartBar />
 
    </div>
  );
};
