
import React from 'react';
import { useApplications } from '@/context/ApplicationContext';
import StatusCard from '@/components/dashboard/StatusCard';
import ApplicationsChart from '@/components/dashboard/ApplicationsChart';
import StatusDonut from '@/components/dashboard/StatusDonut';
import RecentActivity from '@/components/dashboard/RecentActivity';

const Dashboard = () => {
  const { 
    applications, 
    getStatusCounts, 
    getMonthlyApplications 
  } = useApplications();
  
  const statusCounts = getStatusCounts();
  const monthlyData = getMonthlyApplications();
  
  // Total applications count
  const totalApplications = applications.length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Track and manage your job applications</p>
      </div>
      
      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statusCounts.map((status) => (
          <StatusCard 
            key={status.status} 
            status={status.status} 
            count={status.count} 
          />
        ))}
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ApplicationsChart data={monthlyData} />
        <StatusDonut data={statusCounts} />
      </div>
      
      {/* Recent Activity */}
      <RecentActivity applications={applications} />
    </div>
  );
};

export default Dashboard;
