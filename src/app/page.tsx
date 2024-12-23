import { DashboardLayout } from '../components/layout';
import  { DashboardCharts}   from '@/components/home-page/dashboard-charts';
import  { DashboardHome}   from '@/components/home-page/dashboard-ctas';
import { ProductTable }  from '@/components/product'


export default function Home() {
  return (
    <DashboardLayout>
   <DashboardHome />
    <DashboardCharts />
    <ProductTable />
  </DashboardLayout>
  );
}
