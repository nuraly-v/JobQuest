
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobApplication } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface RecentActivityProps {
  applications: JobApplication[];
}

const RecentActivity: React.FC<RecentActivityProps> = ({ applications }) => {
  // Sort applications by lastUpdated (descending)
  const sortedApplications = [...applications].sort((a, b) => 
    new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime()
  );
  
  // Get the 5 most recent applications
  const recentApplications = sortedApplications.slice(0, 5);
  
  // Status badges
  const statusBadge = (status: string) => {
    const statusStyles = {
      applied: 'bg-status-applied/10 text-status-applied border border-status-applied/30',
      interview: 'bg-status-interview/10 text-status-interview border border-status-interview/30',
      offer: 'bg-status-offer/10 text-status-offer border border-status-offer/30',
      rejected: 'bg-status-rejected/10 text-status-rejected border border-status-rejected/30',
      pending: 'bg-status-pending/10 text-status-pending border border-status-pending/30',
    };
    
    const statusLabels = {
      applied: 'Applied',
      interview: 'Interview',
      offer: 'Offer',
      rejected: 'Rejected',
      pending: 'Pending',
    };
    
    return (
      <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status as keyof typeof statusStyles]}`}>
        {statusLabels[status as keyof typeof statusLabels]}
      </span>
    );
  };
  
  const getTimeAgo = (dateString: string) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch (error) {
      return 'Invalid date';
    }
  };

  return (
    <Card className="w-full shadow-md">
      <CardHeader className="pb-2">
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentApplications.length > 0 ? (
            recentApplications.map((app) => (
              <div 
                key={app.id} 
                className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0 animate-in"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{app.company}</span>
                  <span className="text-sm text-muted-foreground">{app.position}</span>
                </div>
                <div className="flex flex-col items-end">
                  {statusBadge(app.status)}
                  <span className="text-xs text-muted-foreground mt-1">
                    {getTimeAgo(app.lastUpdated)}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground">
              No recent activities
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
