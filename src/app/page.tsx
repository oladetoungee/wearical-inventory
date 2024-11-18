import { DashboardLayout } from '../components/layout';
import { DashboardHome, DashboardCharts } from '../components/Dashboard';
import ProductTable from '../components/product/ProductTable';


export default function Home() {
  return (
    <DashboardLayout>
   <DashboardHome />
    <DashboardCharts />
    <ProductTable />
  </DashboardLayout>
  );
}
