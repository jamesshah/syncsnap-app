"use client";

import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "../theme-toggle";

export function SiteNavbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const featuresHref = isHome ? "#features" : "/#features";
  const pricingHref = isHome ? "#pricing" : "/#pricing";

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container mx-auto px-4 pt-4 md:px-6">
        <div className="bg-background/80 supports-[backdrop-filter]:bg-background/50 border-border/60 mx-auto flex h-12 max-w-3xl items-center gap-1 rounded-full border px-2 shadow-sm backdrop-blur-xl">
          <Link
            href="/"
            className="transition-colors duration-200 hover:text-sky-500"
          >
            <span className="text-md font-semibold tracking-tight">
              syncsnap
            </span>
          </Link>

          <span className="bg-border/60 mx-1 hidden h-4 w-px md:block" />

          <nav className="text-muted-foreground hidden items-center text-[13px] md:flex">
            <Link
              href={featuresHref}
              className="hover:text-foreground rounded-full px-3 py-1.5 transition-colors duration-200"
            >
              Features
            </Link>
            <Link
              href={pricingHref}
              className="hover:text-foreground rounded-full px-3 py-1.5 transition-colors duration-200"
            >
              Pricing
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2.5">
            <ModeToggle />
            <SignedOut>
              <Link href="/sign-in">
                <Button
                  size="sm"
                  className="h-8 cursor-pointer rounded-full bg-sky-600 px-4 text-xs text-white hover:bg-sky-700"
                >
                  Sign in
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button
                  size="sm"
                  className="h-8 cursor-pointer rounded-full bg-sky-600 px-4 text-xs text-white hover:bg-sky-700"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
}
