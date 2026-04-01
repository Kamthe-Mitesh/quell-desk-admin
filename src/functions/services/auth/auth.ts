import http from "@/functions/http";
import { ApiResponse, Admin, LoginCredentials, RegisterData } from "@/types/api";

/**
 * Normalize server admin object (_id → id) so the rest of the app uses `id`.
 */
function normalizeAdmin(raw: Record<string, unknown>): Admin {
  return {
    id: (raw._id ?? raw.id) as string,
    email: raw.email as string,
    name: raw.name as string | undefined,
    createdAt: raw.createdAt as string,
  };
}

/**
 * Admin Authentication Service
 * Handles login, registration, logout, and session management for admin users
 */
export const authService = {
  /**
   * Login admin user
   * Server returns: { success, message, user: { _id, name, email, ... } }
   */
  login: async (credentials: LoginCredentials) => {
    const response = await http.post<{ success: boolean; message?: string; user?: Record<string, unknown> }>(
      "/api/v1/admin/auth/login",
      credentials
    );
    const raw = response.data;
    return {
      success: raw.success,
      message: raw.message,
      data: raw.user ? normalizeAdmin(raw.user) : undefined,
    } as ApiResponse<Admin>;
  },

  /**
   * Register new admin user
   * Server returns: { success, message, user: { _id, name, email } }
   */
  register: async (data: RegisterData) => {
    const response = await http.post<{ success: boolean; message?: string; user?: Record<string, unknown> }>(
      "/api/v1/admin/auth/register",
      data
    );
    const raw = response.data;
    return {
      success: raw.success,
      message: raw.message,
      data: raw.user ? normalizeAdmin(raw.user) : undefined,
    } as ApiResponse<Admin>;
  },

  /**
   * Logout current admin user
   */
  logout: async () => {
    const response = await http.post<ApiResponse>("/api/v1/admin/auth/logout");
    return response.data;
  },

  /**
   * Get current authenticated admin user details
   * Server returns: { success, data: { _id, name, email, ... } }
   */
  getMe: async () => {
    const response = await http.get<{ success: boolean; message?: string; data?: Record<string, unknown> }>(
      "/api/v1/admin/auth/me"
    );
    const raw = response.data;
    return {
      success: raw.success,
      message: raw.message,
      data: raw.data ? normalizeAdmin(raw.data) : undefined,
    } as ApiResponse<Admin>;
  },
};