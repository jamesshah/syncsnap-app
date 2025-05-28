import type React from "react";
import { DashboardSidebar } from "~/app/_components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-30 flex min-h-screen flex-col md:mx-60 md:flex-row">
      <DashboardSidebar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
