"use client";

import { UserButton } from "@clerk/nextjs";
import { Menu } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { usePathname } from "next/navigation";
import { dashboardNavItems, getProjectNavItems } from "./nav-items";
import { MobileSidebar } from "./mobile-sidebar";
import { ModeToggle } from "../theme-toggle";

export function DashboardHeader() {
  const pathname = usePathname();

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
    <div className="sticky top-0 z-40 mx-auto w-full 2xl:max-w-[1440px] 2xl:px-[min(4rem,calc((100vw-1440px)/2))]">
      <header className="bg-background/80 supports-[backdrop-filter]:bg-background/50 flex h-14 items-center gap-4 px-4 backdrop-blur-xl sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="cursor-pointer rounded-full md:hidden"
            >
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

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <ModeToggle />
          <UserButton />
        </div>
      </header>
    </div>
  );
}
