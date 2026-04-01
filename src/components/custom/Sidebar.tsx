"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FileText, Users, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/routes";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/components/providers/AuthProvider";

const menuItems = [
  {
    title: "Manage Users",
    href: ROUTES.MANAGE_USERS,
    icon: Users,
  },
  {
    title: "View Complaints",
    href: ROUTES.DASHBOARD_COMPLAINTS,
    icon: FileText,
  },
  {
    title: "Profile",
    href: ROUTES.PROFILE,
    icon: User,
  },
];

interface SidebarProps {
  onNavigate?: () => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex h-full w-64 flex-col border-r border-gray-200 bg-white text-zinc-800">
      {/* Logo/Brand */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <Link href={ROUTES.DASHBOARD} className="flex items-center gap-2">
          <LayoutDashboard className="h-6 w-6 text-(--color-primary)" />
          <span className="text-lg font-bold text-(--color-primary)">
            Dashboard
          </span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-(--color-primary)/10 text-(--color-primary)"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
              )}
            >
              <item.icon
                className={cn(
                  "h-5 w-5",
                  isActive
                    ? "text-(--color-primary)"
                    : "text-zinc-400 group-hover:text-zinc-900"
                )}
              />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-gray-200 px-3 py-4 space-y-3">
        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start gap-3 text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Logout
        </Button>

        {/* Footer Info */}
        <div className="px-3">
          <p className="text-xs text-zinc-400 text-left">
            © {new Date().getFullYear()} Quell Desk
          </p>
          <div className="flex flex-col items-start gap-1 mt-2">
            <Link
              href={ROUTES.PRIVACY_POLICIES}
              className="text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Privacy Policies
            </Link>
            <Link
              href={ROUTES.TERMS_AND_CONDITIONS}
              className="text-[10px] text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              Terms and Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
