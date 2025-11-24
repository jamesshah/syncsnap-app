import type React from "react";
import { DashboardSidebar } from "~/app/_components/dashboard/sidebar";
import { DashboardHeader } from "~/app/_components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <DashboardHeader />
      <div className="mx-30 flex flex-1 flex-col md:mx-60 md:flex-row">
        <DashboardSidebar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
