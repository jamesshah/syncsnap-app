import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import {
  BarChart2,
  Check,
  Circle,
  Code,
  Github,
  Linkedin,
  Smartphone,
  Sparkles,
  Terminal,
  Upload,
  Shield,
} from "lucide-react";
import { ModeToggle } from "../_components/theme-toggle";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Code className="h-6 w-6" />
              <span className="font-bold">SyncSnap</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="#features"
              className="hover:text-foreground/80 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="hover:text-foreground/80 transition-colors"
            >
              Pricing
            </Link>
            {/* <Link
              href="/docs"
              className="hover:text-foreground/80 transition-colors"
            >
              Documentation
            </Link> */}
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-16 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge
                  variant="outline"
                  className="mb-2 rounded-full border-green-500/30 bg-green-500/10 px-3 py-1 text-green-700 dark:text-green-400 [&>svg]:size-2"
                >
                  <Circle className="fill-green-500 text-green-500" />
                  Now in Public Beta
                </Badge>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Cross-Device file uploads made easy
                </h1>
                <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                  Add SyncSnap to your app and let your users upload files from
                  across any device - no app installation required.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <Link href="/dashboard">
                  <Button size="lg" className="cursor-pointer gap-2">
                    Get Started For Free
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer"
                  >
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                How SyncSnap works
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed md:text-lg">
                Enable users to move seamlessly from a desktop or laptop without
                a camera to a mobile device for a more intuitive capture
                experience. No app installation is required; users simply scan a
                QR code. We guide them back to their web journey when capture is
                complete.
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="border-primary/10 bg-primary/5 flex flex-col gap-4 rounded-lg border p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <Terminal className="text-primary h-6 w-6" />
                </div>
                <h3 className="font-semibold">Integrate in minutes</h3>
                <p className="text-muted-foreground text-sm">
                  Add our SDK to your app. One API, one dashboard. Enable the
                  cross-device flow—no app installation required for your users.
                </p>
              </div>
              <div className="border-primary/10 bg-primary/5 flex flex-col gap-4 rounded-lg border p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <Smartphone className="text-primary h-6 w-6" />
                </div>
                <h3 className="font-semibold">Your users upload from mobile</h3>
                <p className="text-muted-foreground text-sm">
                  Users on desktop without a camera scan a QR code and move to
                  their phone for a more intuitive capture experience. We guide
                  them back to their web journey when done.
                </p>
              </div>
              <div className="border-primary/10 bg-primary/5 flex flex-col gap-4 rounded-lg border p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <Upload className="text-primary h-6 w-6" />
                </div>
                <h3 className="font-semibold">One tap, files delivered</h3>
                <p className="text-muted-foreground text-sm">
                  Users tap to upload. Files land in your app instantly. Perfect
                  for forms, documents, or media collection.
                </p>
              </div>
              <div className="border-primary/10 bg-primary/5 flex flex-col gap-4 rounded-lg border p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <Shield className="text-primary h-6 w-6" />
                </div>
                <h3 className="font-semibold">Secure by default</h3>
                <p className="text-muted-foreground text-sm">
                  Encrypted uploads, access control, and compliance-ready. Your
                  users&apos; files stay protected.
                </p>
              </div>
              <div className="border-primary/10 bg-primary/5 flex flex-col gap-4 rounded-lg border p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <Sparkles className="text-primary h-6 w-6" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">
                    Document verification with AI
                  </h3>
                  <Badge
                    variant="outline"
                    className="rounded-full border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-400"
                  >
                    Coming soon
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Configure various verifications for your files to ensure they
                  are valid and secure.
                </p>
              </div>
              <div className="border-primary/10 bg-primary/5 flex flex-col gap-4 rounded-lg border p-6">
                <div className="bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full">
                  <BarChart2 className="text-primary h-6 w-6" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">Analytics</h3>
                  <Badge
                    variant="outline"
                    className="rounded-full border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-xs text-amber-700 dark:text-amber-400"
                  >
                    Coming soon
                  </Badge>
                </div>
                <p className="text-muted-foreground text-sm">
                  Track and review activity across your projects.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                Pricing
              </h2>
              <p className="text-muted-foreground mt-4 md:text-lg">
                Simple, transparent pricing for teams of all sizes
              </p>
            </div>
            <div className="mx-auto mt-12 grid max-w-4xl gap-6 sm:grid-cols-2">
              <div className="border-primary bg-primary/5 ring-primary/20 relative flex flex-col gap-6 rounded-lg border-2 p-8 ring-2">
                <div className="absolute top-4 right-4">
                  <Badge
                    variant="outline"
                    className="rounded-full border-green-500/30 bg-green-500/10 px-2 py-0.5 text-xs text-green-700 dark:text-green-400 [&>svg]:size-3"
                  >
                    <Check className="h-3 w-3" />
                    Selected
                  </Badge>
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Free</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Get started with SyncSnap at no cost.
                  </p>
                </div>
                <ul className="text-muted-foreground flex flex-col gap-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="text-primary h-4 w-4 shrink-0" />
                    Unlimited Projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-primary h-4 w-4 shrink-0" />
                    Upload up to 10 MB files
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-primary h-4 w-4 shrink-0" />
                    100,000 uploads per month *
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="text-primary h-4 w-4 shrink-0" />
                    <span>7 days audit logs</span>
                    <Badge
                      variant="outline"
                      className="rounded-full border-amber-500/30 bg-amber-500/10 px-2 py-0 text-xs text-amber-700 dark:text-amber-400"
                    >
                      Coming soon
                    </Badge>
                  </li>
                </ul>
                <p className="text-muted-foreground text-xs">
                  * Shared across all projects.
                </p>
                <Link href="/dashboard" className="mt-auto">
                  <Button className="w-full cursor-pointer">Get Started</Button>
                </Link>
              </div>
              <div className="border-primary/20 bg-primary/5 flex flex-col gap-4 rounded-lg border border-dashed p-8">
                <h3 className="text-xl font-semibold">Paid</h3>
                <p className="text-muted-foreground text-sm">
                  We&apos;re putting the finishing touches on our pricing plans.
                  Stay tuned!
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-16 md:py-20">
          <div className="container px-4 md:px-6">
            <div className="border-primary/10 bg-primary/5 flex flex-col items-center space-y-6 rounded-lg border p-10 text-center md:p-14">
              <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">
                Ready to get started?
              </h2>
              <p className="text-muted-foreground max-w-[600px]">
                Add cross-device uploads to your app in minutes. Your users will
                love the simplicity.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="cursor-pointer">
                    Get Started For Free
                  </Button>
                </Link>
                <Link href="/docs">
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer"
                  >
                    Read Documentation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted/30 w-full border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} SyncSnap. All rights reserved.
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
