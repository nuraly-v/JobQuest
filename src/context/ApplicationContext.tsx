
import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { JobApplication, StatusType, StatusCount, MonthlyApplications } from '@/types';

// Sample data for initial state
const initialApplications: JobApplication[] = [
  {
    id: uuidv4(),
    company: 'Tech Innovations Inc.',
    position: 'Frontend Developer',
    location: 'San Francisco, CA',
    status: 'interview',
    dateApplied: '2025-03-15',
    url: 'https://techinnovations.com/careers',
    notes: 'Had first interview with the hiring manager. Waiting for technical round.',
    salary: '$120,000 - $140,000',
    contactName: 'Sarah Johnson',
    contactEmail: 'sjohnson@techinnovations.com',
    lastUpdated: '2025-03-20',
  },
  {
    id: uuidv4(),
    company: 'Global Solutions',
    position: 'Full Stack Engineer',
    location: 'Remote',
    status: 'applied',
    dateApplied: '2025-03-18',
    url: 'https://globalsolutions.co/jobs',
    lastUpdated: '2025-03-18',
  },
  {
    id: uuidv4(),
    company: 'DataViz Systems',
    position: 'React Developer',
    location: 'Austin, TX',
    status: 'rejected',
    dateApplied: '2025-03-10',
    notes: 'Position was filled internally.',
    lastUpdated: '2025-03-25',
  },
  {
    id: uuidv4(),
    company: 'Startup Labs',
    position: 'UI/UX Developer',
    location: 'New York, NY',
    status: 'offer',
    dateApplied: '2025-03-05',
    url: 'https://startuplabs.io/careers',
    notes: 'Received offer: $115,000 with good benefits package.',
    salary: '$115,000',
    contactName: 'Michael Wu',
    contactEmail: 'mwu@startuplabs.io',
    lastUpdated: '2025-04-02',
  },
  {
    id: uuidv4(),
    company: 'CloudScale Technologies',
    position: 'JavaScript Developer',
    location: 'Boston, MA',
    status: 'pending',
    dateApplied: '2025-04-05',
    url: 'https://cloudscaletech.com/careers',
    lastUpdated: '2025-04-05',
  },
];

// Context type definitions
interface ApplicationContextType {
  applications: JobApplication[];
  filteredApplications: JobApplication[];
  addApplication: (application: Omit<JobApplication, 'id' | 'lastUpdated'>) => void;
  updateApplication: (id: string, application: Partial<JobApplication>) => void;
  deleteApplication: (id: string) => void;
  getStatusCounts: () => StatusCount[];
  getMonthlyApplications: () => MonthlyApplications[];
  filterByStatus: (status: StatusType | 'all') => void;
  searchApplications: (query: string) => void;
  currentFilter: StatusType | 'all';
  searchQuery: string;
}

// Create context
const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

// Provider component
export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applications, setApplications] = useState<JobApplication[]>(initialApplications);
  const [filteredApplications, setFilteredApplications] = useState<JobApplication[]>(applications);
  const [currentFilter, setCurrentFilter] = useState<StatusType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Apply filters whenever applications, currentFilter, or searchQuery changes
  useEffect(() => {
    let result = applications;
    
    // Apply status filter
    if (currentFilter !== 'all') {
      result = result.filter(app => app.status === currentFilter);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(app => 
        app.company.toLowerCase().includes(query) || 
        app.position.toLowerCase().includes(query) ||
        app.location.toLowerCase().includes(query)
      );
    }
    
    setFilteredApplications(result);
  }, [applications, currentFilter, searchQuery]);

  // Add a new application
  const addApplication = (application: Omit<JobApplication, 'id' | 'lastUpdated'>) => {
    const newApplication: JobApplication = {
      ...application,
      id: uuidv4(),
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setApplications(prev => [newApplication, ...prev]);
    toast.success('Application added successfully');
  };

  // Update an existing application
  const updateApplication = (id: string, application: Partial<JobApplication>) => {
    setApplications(prev => 
      prev.map(app => 
        app.id === id 
          ? { 
              ...app, 
              ...application, 
              lastUpdated: new Date().toISOString().split('T')[0] 
            } 
          : app
      )
    );
    toast.success('Application updated successfully');
  };

  // Delete an application
  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(app => app.id !== id));
    toast.success('Application deleted successfully');
  };

  // Get counts of applications by status
  const getStatusCounts = (): StatusCount[] => {
    const statusTypes: StatusType[] = ['applied', 'interview', 'offer', 'rejected', 'pending'];
    return statusTypes.map(status => ({
      status,
      count: applications.filter(app => app.status === status).length
    }));
  };

  // Get monthly applications data
  const getMonthlyApplications = (): MonthlyApplications[] => {
    // Create a map to store application counts by month
    const monthMap = new Map<string, number>();
    
    // Process each application
    applications.forEach(app => {
      const date = new Date(app.dateApplied);
      const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthMap.has(monthYear)) {
        monthMap.set(monthYear, monthMap.get(monthYear)! + 1);
      } else {
        monthMap.set(monthYear, 1);
      }
    });
    
    // Convert the map to an array and sort by date
    const sortedMonths = Array.from(monthMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([month, count]) => ({
        month: new Date(`${month}-01`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        count
      }));
    
    return sortedMonths;
  };

  // Filter applications by status
  const filterByStatus = (status: StatusType | 'all') => {
    setCurrentFilter(status);
  };

  // Search applications
  const searchApplications = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        filteredApplications,
        addApplication,
        updateApplication,
        deleteApplication,
        getStatusCounts,
        getMonthlyApplications,
        filterByStatus,
        searchApplications,
        currentFilter,
        searchQuery,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

// Custom hook to use the application context
export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};
