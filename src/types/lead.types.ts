export type LeadStatus = "New" | "Contacted" | "Site Visit Scheduled" | "Negotiation" | "Closed / Won" | "Lost";

export interface PropertyLead {
  id: string;
  propertyId?: string;
  propertyTitle?: string;
  projectId?: string;
  projectTitle?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message?: string;
  source: "Property Page" | "Project Page" | "Direct Search" | "Campaign";
  status: LeadStatus;
  assignedTo?: string; // agent or broker name
  budget: string;
  createdAt: string;
  scheduledVisitDate?: string;
  notes?: string[];
}

export interface SupportTicket {
  id: string;
  ticketNumber: string;
  userId: string;
  userName: string;
  userRole: string;
  userEmail: string;
  subject: string;
  category: "Property Verification" | "Listing Dispute" | "Account Issue" | "Payment" | "Technical Bug" | "Other";
  priority: "Low" | "Medium" | "High" | "Urgent";
  status: "Open" | "In Review" | "Pending Action" | "Resolved" | "Closed";
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
  description: string;
  relatedListingId?: string;
}
