"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/functions/services";
import { Admin, AuthContextType, LoginCredentials } from "@/types/api";
import { ROUTES } from "@/lib/routes";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Check authentication status on mount
  const checkAuth = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await authService.getMe();
      
      if (response.success && response.data) {
        setAdmin(response.data);
      } else {
        setAdmin(null);
      }
    } catch (err: any) {
      // Not authenticated or session expired
      setAdmin(null);
      setError(null); // Don't show error for unauthenticated state
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (credentials: LoginCredentials) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      if (response.success && response.data) {
        setAdmin(response.data);
        router.push(ROUTES.DASHBOARD);
      } else {
        throw new Error(response.message || "Login failed");
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to login";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Logout function
  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setAdmin(null);
      setError(null);
      router.push(ROUTES.LOGIN);
    } catch (err: any) {
      console.error("Logout error:", err);
      // Even if logout fails, clear local state
      setAdmin(null);
      router.push(ROUTES.LOGIN);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  // Check auth on initial mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value: AuthContextType = {
    admin,
    isAuthenticated: !!admin,
    isLoading,
    error,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
