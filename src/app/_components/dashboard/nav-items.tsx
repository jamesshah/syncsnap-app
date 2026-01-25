import {
  Home,
  Settings,
  FileText,
  LayoutDashboard,
  Key,
  ClipboardList,
} from "lucide-react";
import { type NavItem } from "./sidebar";

export const dashboardNavItems: NavItem[] = [
  {
    href: "/dashboard",
    label: "Projects",
    icon: Home,
  },
  {
    href: "/dashboard/audit-logs",
    label: "Audit Logs",
    icon: ClipboardList,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: Settings,
  },
];

export const getProjectNavItems = (projectId: string): NavItem[] => [
  {
    href: `/dashboard/${projectId}`,
    label: "Overview",
    icon: LayoutDashboard,
  },
  {
    href: `/dashboard/${projectId}/files`,
    label: "Files",
    icon: FileText,
  },
  {
    href: `/dashboard/${projectId}/api-keys`,
    label: "API Keys",
    icon: Key,
  },
  {
    href: `/dashboard/${projectId}/settings`,
    label: "Settings",
    icon: Settings,
  },
];
