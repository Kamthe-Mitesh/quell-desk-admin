"use client";

import { useEffect, useState } from "react";
import { complaintService } from "@/functions/services";
import ComplaintCard from "@/components/custom/ComplaintCard";
import { FileX } from "lucide-react";
import type { Complaint } from "@/types/api";

export default function ComplaintsPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await complaintService.getAllComplaints();
      
      if (response.success && response.data) {
        setComplaints(response.data);
      } else {
        setError("Failed to load complaints");
      }
    } catch (err) {
      console.error("Error loading complaints:", err);
      setError("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
            Society Complaints
          </h1>
          <p className="mt-2 text-sm sm:text-base text-(--color-primary)/60">
            View complaints from all society members
          </p>
        </div>
        <div className="flex items-center justify-center py-12">
          <p className="text-(--color-primary)/60">Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 sm:p-6 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
            Society Complaints
          </h1>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <FileX className="h-16 w-16 text-red-500/50" />
          <h2 className="mt-4 text-xl font-semibold text-(--color-primary)">
            Error Loading Complaints
          </h2>
          <p className="mt-2 text-sm text-(--color-primary)/60 max-w-md">
            {error}
          </p>
          <button
            onClick={loadComplaints}
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
        <h1 className="text-2xl sm:text-3xl font-bold text-(--color-primary)">
          Society Complaints
        </h1>
        <p className="mt-2 text-sm sm:text-base text-(--color-primary)/60">
          View complaints from all society members
        </p>
      </div>

      {complaints.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center">
          <FileX className="h-12 w-12 sm:h-16 sm:w-16 text-(--color-primary)/20" />
          <h2 className="mt-4 text-lg sm:text-xl font-semibold text-(--color-primary)">
            No complaints yet
          </h2>
          <p className="mt-2 text-sm sm:text-base text-(--color-primary)/60 max-w-md px-4">
            There are no complaints in the system at the moment.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      )}
    </div>
  );
}
