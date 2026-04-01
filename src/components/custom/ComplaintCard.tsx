import Image from "next/image";
import Link from "next/link";
import { Calendar, FileText, AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import type { Complaint } from "@/types/api";
import { ROUTES } from "@/lib/routes";

// Helper functions
function getComplaintAge(createdAt: string): number {
  const created = new Date(createdAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - created.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
}

function isComplaintUrgent(createdAt: string): boolean {
  return getComplaintAge(createdAt) > 30;
}

interface ComplaintCardProps {
  complaint: Complaint;
}

export default function ComplaintCard({ complaint }: ComplaintCardProps) {
  const formattedDate = new Date(complaint.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  const isUrgent = isComplaintUrgent(complaint.createdAt);
  const age = getComplaintAge(complaint.createdAt);

  return (
    <Link href={ROUTES.DASHBOARD_COMPLAINT_DETAIL(complaint.id)}>
      <Card className="group cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-(--color-primary)/10 h-full bg-white border-gray-200 shadow-sm">
        {/* Image Preview - skip placeholder URLs (e.g. example.com) */}
        {complaint.imageUrls && complaint.imageUrls.length > 0 && (() => {
          const imageUrl = complaint.imageUrls[0];
          const isValidUrl =
            imageUrl &&
            typeof imageUrl === "string" &&
            imageUrl.startsWith("http") &&
            !imageUrl.includes("example.com");
          return isValidUrl ? (
            <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
              <Image
                src={imageUrl}
                alt={complaint.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                unoptimized={imageUrl.includes("s3") || imageUrl.includes("amazonaws")}
              />
            </div>
          ) : null;
        })()}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-lg font-semibold text-(--color-primary) line-clamp-2 group-hover:text-(--color-secondary) transition-colors">
              {complaint.title}
            </h3>
            <div className="flex flex-col gap-1 shrink-0">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  complaint.status === "resolved"
                    ? "bg-green-100 text-green-700"
                    : complaint.status === "in-progress"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {complaint.status}
              </span>
              {isUrgent && complaint.status !== "resolved" && (
                <span className="rounded-full px-2 py-1 text-xs font-medium bg-red-100 text-red-700 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Urgent
                </span>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="pb-3">
          <p className="text-sm text-gray-600 line-clamp-2">
            {complaint.subject || complaint.description || complaint.title}
          </p>
        </CardContent>

        <CardFooter className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formattedDate}</span>
            {isUrgent && <span className="text-red-600">({age} days ago)</span>}
          </div>
          {complaint.imageUrls &&
            complaint.imageUrls.filter((u) => u && !String(u).includes("example.com")).length > 0 && (
              <div className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                <span>
                  {complaint.imageUrls.filter((u) => u && !String(u).includes("example.com")).length} image
                  {complaint.imageUrls.filter((u) => u && !String(u).includes("example.com")).length !== 1 ? "s" : ""}
                </span>
              </div>
            )}
        </CardFooter>
      </Card>
    </Link>
  );
}
