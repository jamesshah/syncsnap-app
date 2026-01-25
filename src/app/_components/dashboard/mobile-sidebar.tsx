"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon, Code, HelpCircle } from "lucide-react";
import { cn } from "~/lib/utils";
import { type NavItem } from "./sidebar";

interface MobileSidebarProps {
  navItems: NavItem[];
  homeHref?: string;
  homeLabel?: string;
}

export function MobileSidebar({
  navItems,
  homeHref = "/dashboard",
  homeLabel = "SyncSnap",
}: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center px-4 border-b">
        <Link
          href={homeHref}
          className="flex items-center gap-2 font-semibold"
        >
          <Code className="h-6 w-6" />
          <span>{homeLabel}</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto px-2 py-4">
        <div className="grid gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-accent text-accent-foreground font-semibold"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      <div className="border-t p-4">
        <Link
          href="/help"
          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <HelpCircle className="h-4 w-4 shrink-0" />
          <span>Help & Support</span>
        </Link>
      </div>
    </div>
  );
}
