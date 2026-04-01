import { redirect } from "next/navigation";
import { ROUTES } from "@/lib/routes";

export default function DashboardPage() {
  // Admin dashboard redirects to complaints page
  redirect(ROUTES.DASHBOARD_COMPLAINTS);
}
