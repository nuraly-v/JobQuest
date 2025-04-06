
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { JobApplication } from '@/types';
import { Calendar, ExternalLink, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ApplicationCardProps {
  application: JobApplication;
  onView: () => void;
  onEdit: () => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({ application, onView, onEdit }) => {
  const {
    company,
    position,
    location,
    status,
    dateApplied,
    url,
    lastUpdated
  } = application;
  
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <Card className="w-full h-full hover:shadow-md transition-shadow animate-in">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg truncate">{company}</h3>
          <span className={`rounded-full px-2 py-1 text-xs font-medium ${statusStyles[status]}`}>
            {statusLabels[status]}
          </span>
        </div>
        
        <h4 className="text-md font-medium mb-1">{position}</h4>
        
        <div className="space-y-2 mb-4 flex-grow">
          {location && (
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{location}</span>
            </div>
          )}
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            <span>Applied: {formatDate(dateApplied)}</span>
          </div>
        </div>
        
        <div className="flex flex-col space-y-2 mt-auto">
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>Updated {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}</span>
            
            {url && (
              <a 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 flex items-center"
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Job Link
              </a>
            )}
          </div>
          
          <div className="flex items-center justify-between pt-2 border-t border-border mt-1">
            <Button variant="outline" size="sm" onClick={onView}>
              View
            </Button>
            <Button variant="secondary" size="sm" onClick={onEdit}>
              Edit
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApplicationCard;
