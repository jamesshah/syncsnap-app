import { DashboardSidebar } from "./sidebar";
import { getProjectNavItems } from "./nav-items";

interface ProjectSidebarProps {
  projectId: string;
}

export function ProjectSidebar({ projectId }: ProjectSidebarProps) {
  const navItems = getProjectNavItems(projectId);

  return (
    <DashboardSidebar
      navItems={navItems}
      homeHref={`/dashboard/${projectId}`}
      homeLabel="SyncSnap"
    />
  );
}
