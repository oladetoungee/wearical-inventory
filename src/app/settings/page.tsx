import { DashboardLayout } from '@/components/layout';
import { InfoCard, UpdatePassword } from '@/components/settings';

export default function EmployeePage() {
  return (
    <DashboardLayout>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="flex-1">
          <InfoCard />
        </div>
        <div className="flex-1">
          <UpdatePassword />
        </div>
      </div>
    </DashboardLayout>
  );
}
