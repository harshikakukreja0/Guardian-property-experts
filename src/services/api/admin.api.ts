import { MOCK_USERS } from "../mock/users.data";
import { MOCK_TICKETS } from "../mock/leads.data";
import { MOCK_PROPERTIES } from "../mock/properties.data";
import { UserProfile, UserRole } from "@/types/user.types";
import { SupportTicket } from "@/types/lead.types";

export const adminApi = {
  async getPlatformStats() {
    return {
      totalUsers: 14850,
      totalProperties: 2450,
      totalBrokers: 840,
      totalBuilders: 120,
      totalLeads: 8920,
      monthlyRevenue: "₹86.2 Lac",
      growthRate: "+18.4%",
      pendingApprovals: 28,
      openTickets: 14,
    };
  },

  async getAllUsers(): Promise<UserProfile[]> {
    return MOCK_USERS;
  },

  async updateUserRole(userId: string, role: UserRole): Promise<boolean> {
    const user = MOCK_USERS.find((u) => u.id === userId);
    if (user) {
      user.role = role;
      return true;
    }
    return false;
  },

  async getTickets(): Promise<SupportTicket[]> {
    return MOCK_TICKETS;
  },

  async updateTicketStatus(ticketId: string, status: SupportTicket["status"]): Promise<boolean> {
    const ticket = MOCK_TICKETS.find((t) => t.id === ticketId);
    if (ticket) {
      ticket.status = status;
      return true;
    }
    return false;
  },

  async verifyProperty(propertyId: string, status: "verified" | "rejected"): Promise<boolean> {
    const prop = MOCK_PROPERTIES.find((p) => p.id === propertyId);
    if (prop) {
      prop.verificationStatus = status;
      return true;
    }
    return false;
  },
};
