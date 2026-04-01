import http from "@/functions/http";
import { ApiResponse, User } from "@/types/api";

/**
 * User Management Service
 * Handles admin operations for managing users (fetch, approve, remove)
 */
export const userManagementService = {
  /**
   * Get all users in the system
   * Server returns: { success, message, data: [...], count }
   */
  getAllUsers: async () => {
    const response = await http.get<{ success: boolean; message?: string; data: User[]; count?: number }>(
      "/api/v1/admin/users"
    );
    return response.data;
  },

  /**
   * Approve a pending user (verify their account)
   * Server returns: { success, message, user: { ... } }
   */
  approveUser: async (userId: string) => {
    const response = await http.put<ApiResponse<User>>(
      "/api/v1/admin/users/approve",
      { userId }
    );
    return response.data;
  },

  /**
   * Remove a user from the system
   * Server returns: { success, message, deletedUser: { ... } }
   */
  removeUser: async (userId: string) => {
    const response = await http.delete<ApiResponse>(
      "/api/v1/admin/users/remove",
      { data: { userId } }
    );
    return response.data;
  },
};