import type React from "react";
import { SidebarWrapper } from "~/app/_components/dashboard/sidebar-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full 2xl:max-w-[1440px] 2xl:px-[min(4rem,calc((100vw-1440px)/2))]">
      <div className="flex min-h-screen flex-col md:flex-row">
        <SidebarWrapper />
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}
