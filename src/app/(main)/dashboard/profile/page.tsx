"use client";

import { useState, useEffect } from "react";
import {
  User as UserIcon,
  Mail,
  LogOut,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/providers/AuthProvider";
import type { Admin } from "@/types/api";

export default function ProfilePage() {
  const { admin, isLoading, error: authError, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-zinc-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (authError || !admin) {
    return (
      <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
        <div className="flex items-center justify-center h-64">
          <p className="text-red-500">{authError || "Admin not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-(--color-primary)">
          Admin Profile
        </h1>
        <p className="text-sm sm:text-base text-zinc-500">
          Manage your admin account information.
        </p>
      </div>

      <Card className="border-gray-200 bg-white shadow-lg overflow-hidden">
        <CardHeader className="border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
            <CardTitle className="text-lg sm:text-xl text-(--color-primary) flex items-center gap-2">
              <UserIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              Administrator Information
            </CardTitle>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                onClick={handleLogout}
                variant="outline"
                className="flex-1 sm:flex-none border-red-300 text-red-700 hover:text-red-700 hover:bg-red-50 font-semibold text-sm"
              >
                <LogOut className="h-4 w-4 mr-1 sm:mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 relative">
          {/* Main Info Section */}
          <div className="grid gap-4 sm:gap-6 md:gap-8">
            {/* Name Display */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center gap-2">
                <UserIcon className="h-3 w-3 sm:h-4 sm:w-4" />
                Full Name
              </Label>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                {admin.name || "Not Set"}
              </p>
            </div>

            {/* Email Display */}
            <div className="space-y-2 sm:space-y-3">
              <Label className="text-zinc-500 text-xs sm:text-sm uppercase tracking-wider font-semibold flex items-center gap-2">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                Email Address
              </Label>
              <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">
                {admin.email}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
