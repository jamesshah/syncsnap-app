"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type LucideIcon, HelpCircle } from "lucide-react";
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
  homeLabel = "syncsnap",
}: MobileSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href={homeHref}
          className="text-md font-semibold tracking-tight transition-colors duration-200 hover:text-sky-500"
        >
          {homeLabel}
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
          href="mailto:hello@syncsnap.xyz?subject=Need%20Help%20With%20SyncSnap%3F"
          className="text-muted-foreground hover:bg-accent hover:text-accent-foreground flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
        >
          <HelpCircle className="h-4 w-4 shrink-0" />
          <span>Help & Support</span>
        </Link>
      </div>
    </div>
  );
}
