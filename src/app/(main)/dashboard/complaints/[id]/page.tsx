"use client";

import { use, useState, useEffect } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/routes";
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
import { complaintService, complaintUpdateService } from "@/functions/services";
import type { Complaint } from "@/types/api";

function getComplaintAge(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function isComplaintUrgent(createdAt: string): boolean {
  return getComplaintAge(createdAt) > 30;
}

export default function ComplaintDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();

  const [complaint, setComplaint] = useState<Complaint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<
    "in-progress" | "resolved" | null
  >(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadComplaint();
  }, [id]);

  const loadComplaint = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all complaints and find by id (server has no single-complaint admin endpoint)
      const response = await complaintService.getAllComplaints();
      if (response.success && response.data) {
        const found = response.data.find((c: Complaint) => c.id === id);
        if (found) {
          setComplaint(found);
        } else {
          setComplaint(null);
        }
      } else {
        setError("Failed to load complaint");
      }
    } catch (err) {
      console.error("Error loading complaint:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = (newStatus: "in-progress" | "resolved") => {
    setPendingStatus(newStatus);
    setShowConfirm(true);
  };

  const confirmUpdate = async () => {
    if (!pendingStatus || !complaint) return;

    try {
      setActionLoading(true);
      let response;
      if (pendingStatus === "resolved") {
        response = await complaintUpdateService.markAsResolved(complaint.id);
      } else {
        response = await complaintUpdateService.markAsInProgress(complaint.id);
      }

      if (response.success) {
        // Reload complaint data to get updated status
        await loadComplaint();
      } else {
        alert("Failed to update status: " + (response.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error updating complaint status:", err);
      alert("Failed to update complaint status. Please try again.");
    } finally {
      setActionLoading(false);
      setShowConfirm(false);
      setPendingStatus(null);
    }
  };

  const cancelUpdate = () => {
    setShowConfirm(false);
    setPendingStatus(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
        <div className="flex items-center justify-center py-12">
          <p className="text-(--color-primary)/60">Loading complaint...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
        <Button
          asChild
          variant="ghost"
          className="mb-4 sm:mb-6 text-zinc-600 hover:text-zinc-900"
        >
          <Link href={ROUTES.DASHBOARD_COMPLAINTS}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Complaints
          </Link>
        </Button>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <AlertCircle className="h-16 w-16 text-red-500/50" />
          <h2 className="mt-4 text-xl font-semibold text-(--color-primary)">
            Error Loading Complaint
          </h2>
          <p className="mt-2 text-sm text-(--color-primary)/60">{error}</p>
          <button
            onClick={loadComplaint}
            className="mt-4 px-4 py-2 bg-(--color-primary) text-white rounded-md hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!complaint) {
    notFound();
  }

  const formattedCreatedDate = new Date(
    complaint.createdAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedUpdatedDate = new Date(
    complaint.updatedAt
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const age = getComplaintAge(complaint.createdAt);
  const isUrgent = isComplaintUrgent(complaint.createdAt);

  return (
    <div className="container mx-auto max-w-6xl p-4 sm:p-6 md:p-8">
      {/* Back Button */}
      <Button
        asChild
        variant="ghost"
        className="mb-4 sm:mb-6 text-zinc-600 hover:text-zinc-900"
      >
        <Link href={ROUTES.DASHBOARD_COMPLAINTS}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Complaints
        </Link>
      </Button>

      {/* Complaint ID Header */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
            Complaint #{complaint.id}
          </h1>
          {isUrgent && complaint.status !== "resolved" && (
            <div className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-1.5 sm:px-4 sm:py-2 text-red-700 self-start sm:self-auto w-fit">
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5" />
              <span className="font-semibold text-sm sm:text-base">
                Urgent ({age} days old)
              </span>
            </div>
          )}
        </div>

        {/* Status Update Actions */}
        <div className="flex flex-wrap gap-3">
          <Button
            onClick={() => handleStatusUpdate("in-progress")}
            disabled={
              complaint.status === "in-progress" ||
              complaint.status === "resolved" ||
              actionLoading
            }
            variant="outline"
            className="border-blue-300 text-blue-700 hover:bg-blue-50
            hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Clock className="h-4 w-4 mr-2" />
            Mark In Progress
          </Button>
          <Button
            onClick={() => handleStatusUpdate("resolved")}
            disabled={complaint.status === "resolved" || actionLoading}
            variant="outline"
            className="border-green-300 text-green-700 hover:bg-green-50
            hover:text-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark Resolved
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-white border-gray-200">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-4">
            <CardTitle className="text-xl sm:text-2xl text-(--color-primary)">
              {complaint.title}
            </CardTitle>
            <span
              className={`shrink-0 rounded-full px-3 sm:px-4 py-1 sm:py-1.5 text-xs sm:text-sm font-medium ${
                complaint.status === "resolved"
                  ? "bg-green-100 text-green-700"
                  : complaint.status === "in-progress"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {complaint.status}
            </span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {/* Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-2">
              <Calendar className="h-4 w-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-zinc-500">Submitted</p>
                <p className="text-sm text-zinc-800">{formattedCreatedDate}</p>
                <p className="text-xs text-zinc-500 mt-1">{age} days ago</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="h-4 w-4 text-gray-400 mt-1" />
              <div>
                <p className="text-xs text-zinc-500">Last Updated</p>
                <p className="text-sm text-zinc-800">{formattedUpdatedDate}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="mb-2 text-xs sm:text-sm font-semibold text-zinc-600">
              Description
            </h3>
            <p className="text-sm sm:text-base text-zinc-800 leading-relaxed whitespace-pre-wrap">
              {complaint.subject || complaint.description || "No description provided"}
            </p>
          </div>

          {/* Images */}
          {complaint.imageUrls && complaint.imageUrls.length > 0 && (() => {
            const validImages = complaint.imageUrls.filter(
              (img) => img && typeof img === "string" && img.startsWith("http") && !img.includes("example.com")
            );
            return validImages.length > 0 ? (
              <div>
                <h3 className="mb-3 sm:mb-4 text-xs sm:text-sm font-semibold text-zinc-600">
                  Attachments ({validImages.length})
                </h3>
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2">
                  {validImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video overflow-hidden rounded-lg border border-gray-200"
                    >
                      <Image
                        src={image}
                        alt={`Attachment ${index + 1}`}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null;
          })()}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent className="max-w-md bg-white border border-gray-200 shadow-xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-zinc-900">
              Confirm Status Update
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base pt-2 text-zinc-600">
              You are about to update this complaint status to{" "}
              <span className="font-semibold text-(--color-primary)">
                {pendingStatus === "in-progress" ? "In Progress" : "Resolved"}
              </span>
              .
              <br />
              <br />
              This will send a request to the server to update the complaint.
              {pendingStatus === "resolved" && (
                <span className="block mt-2 text-amber-700 font-medium bg-amber-50 p-2 rounded">
                  Note: Once marked as resolved, the status cannot be changed
                  back.
                </span>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-0">
            <AlertDialogCancel
              onClick={cancelUpdate}
              className="bg-white text-zinc-900 border-gray-300 hover:bg-gray-100
              hover:text-red-700 mt-0"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmUpdate}
              disabled={actionLoading}
              className="bg-(--color-primary) text-white hover:bg-(--color-primary)/90"
            >
              {actionLoading ? "Updating..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
