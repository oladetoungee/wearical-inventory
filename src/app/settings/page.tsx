import { DashboardLayout } from '@/components/layout';
 import {EmployeeTable} from '@/components/employee';


export default function EmployeePage() {
  return (
    <DashboardLayout>
    <EmployeeTable />
  </DashboardLayout>
  );
}
