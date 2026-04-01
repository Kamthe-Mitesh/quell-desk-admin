// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// Admin Entity
export interface Admin {
  id: string;
  email: string;
  name?: string;
  createdAt: string;
}

// User Entity
export interface User {
  id: string;
  phoneNumber: string;
  name: string;
  email: string;
  status: boolean | 'pending' | 'verified';
  createdAt: string;
  updatedAt: string;
  floorNo?: string;
  wing?: string;
}

// Complaint Entity (matches server DynamoDB schema)
export interface Complaint {
  id: string;
  c_id: string;
  user_id: string;
  title: string;
  subject: string;
  description?: string; // kept for backward compat in UI display
  status: 'unresolved' | 'in-progress' | 'resolved';
  createdAt: string;
  updatedAt: string;
  resolvedBy?: string;
  handledBy?: string;
  imageUrls?: string[]; // server uses imageUrls, not images
}

// Auth Request Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name?: string;
}

// Auth Context Types
export interface AuthContextType {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
