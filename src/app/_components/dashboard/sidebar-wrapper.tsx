"use client";

import { usePathname } from "next/navigation";
import { DashboardSidebar } from "./sidebar";
import { dashboardNavItems, getProjectNavItems } from "./nav-items";
import { ProjectSidebar } from "./project-sidebar";

export function SidebarWrapper() {
  const pathname = usePathname();

  // Check if we're on a project details page
  const projectIdMatch = /^\/dashboard\/([^/]+)/.exec(pathname);
  const isProjectPage =
    projectIdMatch &&
    projectIdMatch[1] !== "new" &&
    projectIdMatch[1] !== "settings" &&
    projectIdMatch[1] !== "audit-logs";

  if (isProjectPage && projectIdMatch) {
    const projectId = projectIdMatch[1];
    if (projectId) {
      return <ProjectSidebar projectId={projectId} />;
    }
  }

  // Default dashboard sidebar
  return <DashboardSidebar navItems={dashboardNavItems} />;
}
