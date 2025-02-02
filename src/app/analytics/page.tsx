import { DashboardLayout } from '@/components/layout';
import { StockChart, WeeklyChart, MonthlySalesChart } from '@/components/analytics';
import { DashboardHome } from '@/components/dash-board/dashboard-ctas';
import { LowStockTable } from '@/components/inventory';

export default function AnalyticsPage() {
  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 p-6">
        <div className="col-span-full">
          <DashboardHome />
        </div>
        {[<MonthlySalesChart />, <WeeklyChart />, <StockChart />, <LowStockTable />].map((Component, index) => (
          <div key={index} className="lg:col-span-1">
            {Component}
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
  
}
