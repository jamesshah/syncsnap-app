"use client";

import { UserButton } from "@clerk/nextjs";
import { Bell } from "lucide-react";
import { Button } from "~/components/ui/button";

export function DashboardHeader() {
  return (
    <header className="bg-background sticky top-0 z-10 flex h-14 items-center gap-4 px-4 sm:px-6">
      {/* <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          <DashboardSidebar />
        </SheetContent>
      </Sheet> */}
      <div className="flex flex-1 items-center justify-end gap-4">
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="sr-only">Notifications</span>
          <span className="bg-primary absolute top-1 right-1 flex h-2 w-2 rounded-full"></span>
        </Button>
        <UserButton />
      </div>
    </header>
  );
}
