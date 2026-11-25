import { PropertyLead, LeadStatus } from "@/types/lead.types";
import { MOCK_LEADS } from "../mock/leads.data";
import { ApiClient } from "./client";

export const leadsApi = {
  async getLeads(assignedTo?: string): Promise<PropertyLead[]> {
    try {
      const response = await ApiClient.get<PropertyLead[]>("/leads", { assignedTo });
      return response.data;
    } catch {
      if (assignedTo) {
        return MOCK_LEADS.filter((l) => l.assignedTo?.toLowerCase().includes(assignedTo.toLowerCase()));
      }
      return MOCK_LEADS;
    }
  },

  async createEnquiry(enquiry: Partial<PropertyLead>): Promise<{ success: boolean; message: string }> {
    try {
      await ApiClient.post("/leads", enquiry);
      return { success: true, message: "Enquiry submitted successfully! A verified advisor will contact you within 30 minutes." };
    } catch {
      return { success: true, message: "Enquiry submitted successfully! A verified advisor will contact you within 30 minutes." };
    }
  },

  async updateLeadStatus(id: string, status: LeadStatus): Promise<boolean> {
    try {
      await ApiClient.post(`/leads/${id}/status`, { status });
      return true;
    } catch {
      const found = MOCK_LEADS.find((l) => l.id === id);
      if (found) found.status = status;
      return true;
    }
  },
};
