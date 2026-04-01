"use client";

import ComplaintForm from "@/components/custom/ComplaintForm";
import { getUser, isProfileComplete, canSubmitComplaints } from "@/lib/data";
import { AlertCircle, Lock } from "lucide-react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/button";

export default function NewComplaintPage() {
  const user = getUser();
  const profileComplete = isProfileComplete(user);
  const canSubmit = canSubmitComplaints(user);

  return (
    <div className="container mx-auto max-w-4xl p-6 md:p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-[var(--color-primary)]">New Complaint</h1>
        <p className="mt-2 text-[var(--color-primary)]/60">
          Submit a new complaint to report any issues or concerns.
        </p>
      </div>

      {/* Show blocked state if user cannot submit complaints */}
      {!canSubmit ? (
        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-12">
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-amber-100">
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            
            <h2 className="mb-2 text-xl font-semibold text-[var(--color-primary)]">
              {!profileComplete ? "Complete Your Profile" : "Account Pending Verification"}
            </h2>
            
            <p className="mb-6 max-w-md text-zinc-600">
              {!profileComplete 
                ? "Please complete your profile by adding your phone number, wing, floor, and flat number before submitting complaints."
                : "Your profile is complete! Please wait for admin verification to submit complaints. You'll be able to access this feature once your account is verified."}
            </p>

            {!profileComplete ? (
              <Button
                asChild
                className="bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary)]/90"
              >
                <Link href={ROUTES.PROFILE}>
                  Complete Profile
                </Link>
              </Button>
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-amber-900">Awaiting Admin Approval</p>
                    <p className="mt-1 text-sm text-amber-700">
                      An administrator will review and verify your account soon. You'll be notified once approved.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ComplaintForm />
      )}
    </div>
  );
}
