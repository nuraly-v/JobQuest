
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useApplications } from '@/context/ApplicationContext';
import ApplicationCard from '@/components/applications/ApplicationCard';
import StatusFilter from '@/components/applications/StatusFilter';
import SearchBar from '@/components/applications/SearchBar';
import ApplicationDialog from '@/components/applications/ApplicationDialog';
import { JobApplication, StatusType } from '@/types';
import { Plus } from 'lucide-react';

const Applications = () => {
  const { 
    filteredApplications, 
    getStatusCounts, 
    filterByStatus, 
    searchApplications,
    currentFilter,
    searchQuery
  } = useApplications();
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'view' | 'edit' | 'create'>('create');
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | undefined>(undefined);
  
  const statusCounts = getStatusCounts();
  
  const handleOpenCreateDialog = () => {
    setSelectedApplication(undefined);
    setDialogMode('create');
    setDialogOpen(true);
  };
  
  const handleOpenViewDialog = (application: JobApplication) => {
    setSelectedApplication(application);
    setDialogMode('view');
    setDialogOpen(true);
  };
  
  const handleOpenEditDialog = (application: JobApplication) => {
    setSelectedApplication(application);
    setDialogMode('edit');
    setDialogOpen(true);
  };
  
  const handleFilterChange = (status: StatusType | 'all') => {
    filterByStatus(status);
  };
  
  const handleSearchChange = (value: string) => {
    searchApplications(value);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Applications</h1>
        <p className="text-muted-foreground">Manage all your job applications in one place</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <StatusFilter 
          currentFilter={currentFilter} 
          onFilterChange={handleFilterChange} 
          counts={statusCounts}
        />
        
        <Button onClick={handleOpenCreateDialog} className="w-full md:w-auto">
          <Plus className="h-4 w-4 mr-1" />
          Add Application
        </Button>
      </div>
      
      <div className="w-full">
        <SearchBar value={searchQuery} onChange={handleSearchChange} />
      </div>
      
      {filteredApplications.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onView={() => handleOpenViewDialog(application)}
              onEdit={() => handleOpenEditDialog(application)}
            />
          ))}
        </div>
      ) : (
        <div className="border border-dashed rounded-lg py-8 text-center">
          <h3 className="font-medium text-lg">No applications found</h3>
          <p className="text-muted-foreground mb-4">
            {searchQuery || currentFilter !== 'all' 
              ? "Try changing your filters or search criteria"
              : "Get started by adding your first job application"}
          </p>
          {!searchQuery && currentFilter === 'all' && (
            <Button onClick={handleOpenCreateDialog}>
              <Plus className="h-4 w-4 mr-1" />
              Add Application
            </Button>
          )}
        </div>
      )}
      
      <ApplicationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        application={selectedApplication}
        mode={dialogMode}
      />
    </div>
  );
};

export default Applications;
