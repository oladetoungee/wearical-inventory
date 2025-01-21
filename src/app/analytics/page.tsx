import { DashboardLayout } from '@/components/layout';
import { ChartLine, ChartBar, DonutChart } from '@/components/ui';
import { DashboardHome } from '@/components/dashboard';
import { LowStockTable } from '@/components/inventory';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-6">
        <div className="col-span-full">
          <DashboardHome />
        </div>
        {[<ChartLine />, <ChartBar />, <DonutChart />, <LowStockTable />].map((Component, index) => (
          <div key={index} className="lg:col-span-1">
            {Component}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
  
}
