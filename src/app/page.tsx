import { DashboardLayout } from '../components/layout';
import  { DashboardCharts}   from '@/components/dashboard/dashboard-charts';
import  { DashboardHome}   from '@/components/dashboard/dashboard-ctas';
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
