import { DashboardLayout } from '@/components/layout';
 import { ChartLine, ChartBar } from '@/components/ui';
import { DashboardHome } from '@/components/dashboard';
export default function EmployeePage() {
  return (
    <DashboardLayout>
        <DashboardHome />
<ChartLine />
<ChartBar />
  </DashboardLayout>
  );
}
