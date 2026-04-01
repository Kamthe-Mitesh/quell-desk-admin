import http from "@/functions/http";
import { ApiResponse, Complaint } from "@/types/api";

/**
 * Complaint Update Service
 * Handles status updates for complaints (mark as resolved or in-progress)
 */
export const complaintUpdateService = {
  /**
   * Mark a complaint as resolved
   * @param complaintId - The ID of the complaint to resolve
   * @returns Promise with API response containing updated complaint data
   */
  markAsResolved: async (complaintId: string) => {
    const response = await http.put<ApiResponse<Complaint>>(
      "/api/v1/admin/complaint/resolve",
      { complaintId }
    );
    return response.data;
  },

  /**
   * Mark a complaint as in-progress
   * @param complaintId - The ID of the complaint to mark as in-progress
   * @returns Promise with API response containing updated complaint data
   */
  markAsInProgress: async (complaintId: string) => {
    const response = await http.put<ApiResponse<Complaint>>(
      "/api/v1/admin/complaint/in-progress",
      { complaintId }
    );
    return response.data;
  },
};