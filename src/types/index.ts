
export type StatusType = 'applied' | 'interview' | 'offer' | 'rejected' | 'pending';

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  location: string;
  status: StatusType;
  dateApplied: string;
  url?: string;
  notes?: string;
  salary?: string;
  contactName?: string;
  contactEmail?: string;
  lastUpdated: string;
}

export interface StatusCount {
  status: StatusType;
  count: number;
}

export interface MonthlyApplications {
  month: string;
  count: number;
}
