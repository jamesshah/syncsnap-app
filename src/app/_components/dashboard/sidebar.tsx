"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon, Code, HelpCircle } from "lucide-react";

import { cn } from "~/lib/utils";

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface DashboardSidebarProps {
  navItems: NavItem[];
  homeHref?: string;
  homeLabel?: string;
}

export function DashboardSidebar({
  navItems,
  homeHref = "/dashboard",
  homeLabel = "SyncSnap",
}: DashboardSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="bg-background/60 hidden md:block md:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center px-4">
          <Link
            href={homeHref}
            className="flex items-center gap-2 text-sm font-semibold tracking-tight"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-sky-500/25 bg-sky-500/10">
              <Code className="h-4 w-4 text-sky-500" />
            </span>
            <span>{homeLabel}</span>
          </Link>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="grid gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              // Highlight active route based on exact match
              // This ensures precise highlighting: each route only highlights when exactly on that route
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-sky-500/10 text-foreground shadow-sm ring-1 ring-sky-500/25"
                      : "text-muted-foreground hover:bg-accent/60 hover:text-accent-foreground hover:-translate-y-0.5",
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
        <div className="p-4">
          <Link
            href="/help"
            className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            <HelpCircle className="h-4 w-4 shrink-0" />
            <span>Help & Support</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
