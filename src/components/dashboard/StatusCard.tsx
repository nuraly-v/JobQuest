
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { StatusType } from '@/types';

interface StatusCardProps {
  status: StatusType;
  count: number;
}

const StatusCard: React.FC<StatusCardProps> = ({ status, count }) => {
  const statusConfig = {
    applied: {
      label: 'Applied',
      color: 'bg-status-applied',
      textColor: 'text-white',
    },
    interview: {
      label: 'Interview',
      color: 'bg-status-interview',
      textColor: 'text-white',
    },
    offer: {
      label: 'Offer',
      color: 'bg-status-offer',
      textColor: 'text-white',
    },
    rejected: {
      label: 'Rejected',
      color: 'bg-status-rejected',
      textColor: 'text-white',
    },
    pending: {
      label: 'Pending',
      color: 'bg-status-pending',
      textColor: 'text-white',
    },
  };

  const { label, color, textColor } = statusConfig[status];

  return (
    <Card className={`${color} ${textColor} shadow-md transform transition-all duration-200 hover:scale-105`}>
      <CardContent className="pt-6">
        <div className="text-center">
          <h3 className="text-lg font-medium">{label}</h3>
          <p className="text-3xl font-bold">{count}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
