"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Home,
  Settings,
  Users,
  CreditCard,
  HelpCircle,
  Code,
  Key,
  Bell,
} from "lucide-react";

import { cn } from "~/lib/utils";

export function DashboardSidebar() {
  const pathname = usePathname();

  return (
    <div className="bg-background hidden md:block md:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center px-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 font-semibold"
          >
            <Code className="h-6 w-6" />
            <span>SyncSnap</span>
          </Link>
        </div>
        {/* <ScrollArea className="flex-1 py-2"> */}
        <nav className="grid gap-1 px-2 py-6">
          <Link
            href="/dashboard"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard"
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <Home className="h-4 w-4" />
            Projects
          </Link>
          <Link
            href="/dashboard/analytics"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/analytics"
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <BarChart className="h-4 w-4" />
            Analytics
          </Link>
          <Link
            href="/dashboard/api-keys"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/api-keys"
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <Key className="h-4 w-4" />
            API Keys
          </Link>
          <Link
            href="/dashboard/users"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/users"
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <Users className="h-4 w-4" />
            Team
          </Link>
          <Link
            href="/dashboard/billing"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/billing"
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <CreditCard className="h-4 w-4" />
            Billing
          </Link>
          <Link
            href="/dashboard/notifications"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/notifications"
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <Bell className="h-4 w-4" />
            Notifications
          </Link>
          <Link
            href="/dashboard/settings"
            className={cn(
              "hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium",
              pathname === "/dashboard/settings"
                ? "bg-accent text-accent-foreground"
                : "transparent",
            )}
          >
            <Settings className="h-4 w-4" />
            Settings
          </Link>
        </nav>
        {/* </ScrollArea> */}
        <div className="mt-auto border-t p-4">
          <div className="mt-4 grid gap-1">
            <Link
              href="/help"
              className="hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium"
            >
              <HelpCircle className="h-4 w-4" />
              Help & Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
