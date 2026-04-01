import http from "@/functions/http";
import { Complaint } from "@/types/api";

/**
 * Complaint Fetching Service
 * Handles retrieving complaint data for admin dashboard
 */
export const complaintService = {
  /**
   * Get all complaints from the system
   * Server returns: { success, message, data: [...], count }
   */
  getAllComplaints: async () => {
    const response = await http.get<{ success: boolean; message?: string; data: Complaint[]; count?: number }>(
      "/api/v1/admin/complaint"
    );
    return response.data;
  },
};