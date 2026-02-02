"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell, Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { usePathname } from "next/navigation";
import { dashboardNavItems, getProjectNavItems } from "./nav-items";
import { MobileSidebar } from "./mobile-sidebar";

export function DashboardHeader() {
  const pathname = usePathname();

  // Determine which nav items to show in mobile menu
  const projectIdMatch = /^\/dashboard\/([^/]+)/.exec(pathname);
  const projectId = projectIdMatch?.[1];
  const isProjectPage =
    projectId &&
    projectId !== "new" &&
    projectId !== "settings" &&
    projectId !== "audit-logs";

  const navItems =
    isProjectPage && projectId
      ? getProjectNavItems(projectId)
      : dashboardNavItems;

  const homeHref =
    isProjectPage && projectId ? `/dashboard/${projectId}` : "/dashboard";

  return (
    <div className="sticky top-0 z-50 mx-auto w-full 2xl:max-w-[1440px] 2xl:px-[min(4rem,calc((100vw-1440px)/2))]">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 flex h-14 items-center gap-4 border-b px-4 backdrop-blur sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[280px] p-0">
            <MobileSidebar
              navItems={navItems}
              homeHref={homeHref}
              homeLabel="SyncSnap"
            />
          </SheetContent>
        </Sheet>
        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
            <span className="bg-primary absolute top-1 right-1 flex h-2 w-2 rounded-full"></span>
          </Button>
          <UserButton />
        </div>
      </header>
    </div>
  );
}
