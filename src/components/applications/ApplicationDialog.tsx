
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { JobApplication, StatusType } from "@/types";
import { ExternalLink, Trash2 } from "lucide-react";
import { useApplications } from "@/context/ApplicationContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ApplicationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application?: JobApplication;
  mode: 'view' | 'edit' | 'create';
}

type FormData = Omit<JobApplication, 'id' | 'lastUpdated'>;

const initialFormData: FormData = {
  company: '',
  position: '',
  location: '',
  status: 'applied',
  dateApplied: new Date().toISOString().split('T')[0],
  url: '',
  notes: '',
  salary: '',
  contactName: '',
  contactEmail: '',
};

const ApplicationDialog: React.FC<ApplicationDialogProps> = ({ open, onOpenChange, application, mode }) => {
  const { addApplication, updateApplication, deleteApplication } = useApplications();
  const [formData, setFormData] = useState<FormData>(
    application ? { ...application } : initialFormData
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Reset form when dialog opens/closes or mode changes
  React.useEffect(() => {
    if (open) {
      setFormData(application ? { ...application } : initialFormData);
    }
  }, [open, application, mode]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: StatusType) => {
    setFormData((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'create') {
      addApplication(formData);
    } else if (mode === 'edit' && application) {
      updateApplication(application.id, formData);
    }
    
    onOpenChange(false);
  };

  const handleDelete = () => {
    if (application) {
      deleteApplication(application.id);
      setDeleteDialogOpen(false);
      onOpenChange(false);
    }
  };

  const isViewMode = mode === 'view';
  const dialogTitle = 
    mode === 'create' ? 'Add New Application' : 
    mode === 'edit' ? 'Edit Application' : 
    `${application?.company} - ${application?.position}`;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            {mode === 'create' && (
              <DialogDescription>
                Track a new job application to keep your job search organized.
              </DialogDescription>
            )}
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={handleStatusChange}
                  disabled={isViewMode}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateApplied">Date Applied</Label>
                <Input
                  id="dateApplied"
                  name="dateApplied"
                  type="date"
                  value={formData.dateApplied}
                  onChange={handleInputChange}
                  required
                  disabled={isViewMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="salary">Salary (Optional)</Label>
                <Input
                  id="salary"
                  name="salary"
                  placeholder="e.g. $70,000 - $90,000"
                  value={formData.salary}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="url">Job URL (Optional)</Label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  name="url"
                  type="url"
                  placeholder="https://..."
                  value={formData.url || ''}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                  className="flex-1"
                />
                {isViewMode && formData.url && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    asChild
                  >
                    <a href={formData.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactName">Contact Name (Optional)</Label>
                <Input
                  id="contactName"
                  name="contactName"
                  value={formData.contactName || ''}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email (Optional)</Label>
                <Input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  value={formData.contactEmail || ''}
                  onChange={handleInputChange}
                  disabled={isViewMode}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                rows={4}
                value={formData.notes || ''}
                onChange={handleInputChange}
                disabled={isViewMode}
                placeholder="Add any additional notes about this application..."
              />
            </div>
            
            <DialogFooter className="pt-4 flex items-center justify-between">
              {mode === 'edit' && application && (
                <Button 
                  type="button" 
                  variant="outline" 
                  className="text-destructive border-destructive hover:bg-destructive/10"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              )}
              
              <div className="flex gap-2 ml-auto">
                {!isViewMode ? (
                  <>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      {mode === 'create' ? 'Add Application' : 'Save Changes'}
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => onOpenChange(false)}>
                    Close
                  </Button>
                )}
              </div>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the application for {application?.position} at {application?.company}.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ApplicationDialog;
