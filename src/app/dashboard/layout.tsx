import type React from "react";
import { SidebarWrapper } from "~/app/_components/dashboard/sidebar-wrapper";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative mx-auto w-full overflow-x-clip 2xl:max-w-[1440px] 2xl:px-[min(4rem,calc((100vw-1440px)/2))]">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute top-[-120px] left-1/2 h-[260px] w-[260px] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="absolute right-[-120px] bottom-10 h-[220px] w-[220px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>
      <div className="flex min-h-screen flex-col md:flex-row">
        <SidebarWrapper />
        <main className="flex-1 overflow-hidden bg-background/60">
          {children}
        </main>
      </div>
    </div>
  );
}
