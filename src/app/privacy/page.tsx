import type { Metadata } from "next";
import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Code, Github, Linkedin } from "lucide-react";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "../_components/theme-toggle";

export const metadata: Metadata = {
  title: "Privacy Policy | SyncSnap",
  description: "Privacy Policy for using SyncSnap.",
};

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <header className="sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 pt-4 md:px-6">
          <div className="bg-background/80 supports-[backdrop-filter]:bg-background/50 border-border/60 mx-auto flex h-12 max-w-3xl items-center gap-1 rounded-full border px-2 shadow-sm backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-2 pr-3 pl-2">
              <Code className="h-4 w-4 text-sky-500" />
              <span className="text-sm font-semibold tracking-tight">SyncSnap</span>
            </Link>

            <span className="bg-border/60 mx-1 hidden h-4 w-px md:block" />

            <nav className="text-muted-foreground hidden items-center text-[13px] md:flex">
              <Link
                href="/#features"
                className="hover:text-foreground rounded-full px-3 py-1.5 transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="/#pricing"
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

      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            SyncSnap Privacy Policy
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Effective date: February 24, 2026
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">1. Information We Collect</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We may collect account information, basic usage analytics, and
              files or data you submit through the service.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">2. How We Use Information</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We use collected information to operate, maintain, secure, and
              improve SyncSnap.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">3. User Files and Data</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You are responsible for the legality, accuracy, and content of
              files and data uploaded using SyncSnap.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">
              4. Data Security and Liability
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We use reasonable safeguards, but no platform can guarantee
              absolute security. SyncSnap is not liable for any type of files or
              data uploaded by users.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">5. Policy Updates</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We may update this Privacy Policy periodically. By continuing to
              use SyncSnap, you accept the updated policy.
            </p>
          </section>
        </div>
      </main>

      <footer className="bg-muted/30 mt-auto w-full border-t py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-muted-foreground pr-3 text-sm">
              © {new Date().getFullYear()} SyncSnap. All rights reserved.{" "}
              <Link
                href="/terms"
                className="text-foreground pl-3 text-sm transition-colors hover:text-sky-600"
              >
                Terms
              </Link>{" "}
              <Link
                href="/privacy"
                className="text-foreground pl-3 text-sm transition-colors hover:text-sky-600"
              >
                Privacy
              </Link>
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://linkedin.com/in/james-shah"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/jamesshah/syncsnap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
