import { DashboardLayout } from '@/components/layout';
import { DashboardHome, DashboardCharts } from '@/components/dashboard';
import ProductTable from '@/components/product/ProductTable';


export default function EmployeePage() {
  return (
    <DashboardLayout>
   <DashboardHome />
    <DashboardCharts />
    <ProductTable />
  </DashboardLayout>
  );
}
