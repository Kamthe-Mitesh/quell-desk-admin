"use client";

import { useState, useEffect } from "react";
import { userManagementService } from "@/functions/services";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Mail,
  Phone,
  Building2,
  CheckCircle,
  Trash2,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import type { User } from "@/types/api";

export default function ManageUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await userManagementService.getAllUsers();
      
      if (response.success && response.data) {
        setUsers(response.data);
      } else {
        setError("Failed to load users");
      }
    } catch (err) {
      console.error("Error loading users:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyUser = async (userId: string) => {
    try {
      setActionLoading(true);
      const response = await userManagementService.approveUser(userId);
      
      if (response.success) {
        // Reload users to get updated data
        await loadUsers();
      } else {
        alert("Failed to verify user: " + (response.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error verifying user:", err);
      alert("Failed to verify user. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    
    try {
      setActionLoading(true);
      const response = await userManagementService.removeUser(userToDelete);
      
      if (response.success) {
        // Reload users to get updated data
        await loadUsers();
        setUserToDelete(null);
      } else {
        alert("Failed to delete user: " + (response.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Failed to delete user. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-(--color-primary)" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
                Manage Users
              </h1>
              <p className="mt-1 text-sm sm:text-base text-(--color-primary)/60">
                Verify and manage user accounts
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-(--color-primary)/60">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3">
            <Users className="h-8 w-8 text-(--color-primary)" />
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
                Manage Users
              </h1>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="h-16 w-16 text-red-500/50" />
          <h2 className="mt-4 text-xl font-semibold text-(--color-primary)">
            Error Loading Users
          </h2>
          <p className="mt-2 text-sm text-(--color-primary)/60 max-w-md">
            {error}
          </p>
          <button
            onClick={loadUsers}
            className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8">
      <div className="mb-6 md:mb-8">
        <div className="flex items-center gap-3">
          <Users className="h-8 w-8 text-(--color-primary)" />
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
              Manage Users
            </h1>
            <p className="mt-1 text-sm sm:text-base text-(--color-primary)/60">
              Verify and manage user accounts
            </p>
          </div>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
          <Users className="h-12 w-12 sm:h-16 sm:w-16 text-(--color-primary)/20" />
          <h2 className="mt-4 text-lg sm:text-xl font-semibold text-(--color-primary)">
            No users found
          </h2>
          <p className="mt-2 text-sm sm:text-base text-(--color-primary)/60 max-w-md px-4">
            There are no users to manage at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {users.map((user) => (
            <Card
              key={user.id}
              className="border-gray-200 bg-white shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <CardHeader className="border-b border-gray-200 pb-4">
                <CardTitle className="text-lg font-medium text-(--color-primary) flex items-center justify-between">
                  <span className="truncate">{user.name}</span>
                  {user.status === true || user.status === 'verified' ? (
                    <Badge className="bg-green-100 text-green-800 border-green-200 hover:bg-green-100">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge className="bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-100">
                      Pending
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>

              <CardContent className="pt-4 space-y-3">
                {/* Email */}
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                  <span className="text-gray-600 truncate">{user.email}</span>
                </div>

                {/* Phone */}
                {user.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-gray-600">{user.phoneNumber}</span>
                  </div>
                )}

                {/* Floor and Wing */}
                {(user.floorNo || user.wing) && (
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-gray-400 shrink-0" />
                    <span className="text-gray-600">
                      {user.wing && `Wing ${user.wing}`}
                      {user.wing && user.floorNo && ", "}
                      {user.floorNo && `Floor ${user.floorNo}`}
                    </span>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  {(user.status === false || user.status === 'pending') && (
                    <Button
                      onClick={() => handleVerifyUser(user.id)}
                      disabled={actionLoading}
                      size="sm"
                      className="flex-1 bg-(--color-primary) 
                      text-(--color-off-white) hover:bg-(--color-primary)/90 font-medium"
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Verify User
                    </Button>
                  )}
                  <Button
                    onClick={() => setUserToDelete(user.id)}
                    disabled={actionLoading}
                    size="sm"
                    variant="outline"
                    className="flex-1 border-red-300 text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={!!userToDelete}
        onOpenChange={() => setUserToDelete(null)}
      >
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-(--color-primary)">
              Delete User
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600">
              Are you sure you want to delete this user? This action cannot be
              undone. The user will be permanently removed from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-300 text-gray-700 hover:bg-gray-100">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteUser}
              disabled={actionLoading}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              {actionLoading ? "Deleting..." : "Delete User"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
