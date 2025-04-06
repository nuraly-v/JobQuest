
import React from 'react';
import { Button } from '@/components/ui/button';
import { StatusType } from '@/types';

interface StatusFilterProps {
  currentFilter: StatusType | 'all';
  onFilterChange: (status: StatusType | 'all') => void;
  counts: { status: StatusType; count: number }[];
}

const StatusFilter: React.FC<StatusFilterProps> = ({ currentFilter, onFilterChange, counts }) => {
  // Calculate total for "All" category
  const total = counts.reduce((sum, item) => sum + item.count, 0);
  
  const filters: { value: StatusType | 'all'; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'applied', label: 'Applied' },
    { value: 'interview', label: 'Interview' },
    { value: 'offer', label: 'Offer' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'pending', label: 'Pending' },
  ];
  
  const getCountForStatus = (status: StatusType | 'all') => {
    if (status === 'all') return total;
    const statusItem = counts.find(item => item.status === status);
    return statusItem ? statusItem.count : 0;
  };

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <Button
          key={filter.value}
          variant={currentFilter === filter.value ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange(filter.value)}
          className="flex items-center"
        >
          {filter.label}
          <span className="ml-1.5 text-xs px-1.5 py-0.5 rounded-full bg-background/10">
            {getCountForStatus(filter.value)}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default StatusFilter;
