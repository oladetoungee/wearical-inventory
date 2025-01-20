import { DashboardLayout } from '@/components/layout';
 import { ChartLine, ChartBar, DonutChart  } from '@/components/ui';
import { DashboardHome } from '@/components/dashboard';
export default function EmployeePage() {
  return (
    <DashboardLayout>
        <DashboardHome />
<ChartLine />
<ChartBar />
<DonutChart />
  </DashboardLayout>
  );
}
