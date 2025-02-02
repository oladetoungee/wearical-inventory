import { DashboardLayout } from '../components/layout';
import  { DashboardCharts}   from '@/components/dash-board/dashboard-charts';
import  { DashboardHome}   from '@/components/dash-board/dashboard-ctas';
import { ProductTable }  from '@/components/inventory'


export default function Home() {
  return (
    <DashboardLayout>
   <DashboardHome />
    <DashboardCharts />
    <ProductTable />
  </DashboardLayout>
  );
}
