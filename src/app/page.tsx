import { DashboardLayout } from '../components/layout';
import { DashboardHome, DashboardCharts } from '@/components/dashboard';
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
