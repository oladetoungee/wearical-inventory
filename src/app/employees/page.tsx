import { DashboardLayout } from '@/components/layout';
import { DashboardHome, DashboardCharts } from '@/components/dashboard';
import {EmployeeTable} from '@/components/employee';


export default function EmployeePage() {
  return (
    <DashboardLayout>
    <EmployeeTable />
  </DashboardLayout>
  );
}
