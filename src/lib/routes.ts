// src/lib/routes.ts
export const ROUTES = {
  // Authentication Routes
  LOGIN: "/login",
  SIGNUP: "/signup",

  // User Dashboard Routes
  DASHBOARD: "/dashboard",
  DASHBOARD_NEW: "/dashboard/new",
  DASHBOARD_COMPLAINTS: "/dashboard/complaints",
  DASHBOARD_COMPLAINT_DETAIL: (id: string) => `/dashboard/complaints/${id}`,
  
  // Complaint Management Routes
  COMPLAINTS: "/complaint",
  NEW_COMPLAINT: "/complaint/new",
  // Dynamic route for complaint details
  COMPLAINT_DETAILS: (id: string) => `/complaint/${id}`,

  // Profile Management Routes
  PROFILE: "/dashboard/profile",

  // Admin Routes
  MANAGE_USERS: "/dashboard/users",

  // Informational Pages
  PRIVACY_POLICIES: "/privacy-policies",
  TERMS_AND_CONDITIONS: "/terms-and-conditions",
};
