import { SignedOut, SignedIn, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  BarChart2,
  Check,
  Circle,
  Code,
  Github,
  Linkedin,
  Shield,
  Smartphone,
  Sparkles,
  Terminal,
  Upload,
} from "lucide-react";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "../_components/theme-toggle";

const coreFeatures = [
  {
    title: "Integrate in minutes",
    description:
      "Use one SDK and one API to launch a cross-device upload flow without extra app dependencies.",
    icon: Terminal,
    iconClassName:
      "text-sky-600 bg-sky-500/10 border border-sky-500/20 dark:text-sky-400",
  },
  {
    title: "Mobile capture flow",
    description:
      "Move users from desktop to mobile with a quick scan and guide them back to your web journey automatically.",
    icon: Smartphone,
    iconClassName:
      "text-violet-600 bg-violet-500/10 border border-violet-500/20 dark:text-violet-400",
  },
  {
    title: "Instant file delivery",
    description:
      "Uploads appear in your app immediately so forms, onboarding, and verification stay fast.",
    icon: Upload,
    iconClassName:
      "text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 dark:text-emerald-400",
  },
  {
    title: "Security by default",
    description:
      "Encrypted transit, scoped access controls, and production-ready reliability for sensitive file flows.",
    icon: Shield,
    iconClassName:
      "text-sky-600 bg-sky-500/10 border border-sky-500/20 dark:text-sky-400",
  },
  {
    title: "AI verification",
    description:
      "Configure automated checks for document validity and quality before the file reaches your pipeline.",
    icon: Sparkles,
    iconClassName:
      "text-violet-600 bg-violet-500/10 border border-violet-500/20 dark:text-violet-400",
    comingSoon: true,
  },
  {
    title: "Analytics",
    description:
      "Track completion rates, upload volume, and flow health so product teams can optimize onboarding.",
    icon: BarChart2,
    iconClassName:
      "text-emerald-600 bg-emerald-500/10 border border-emerald-500/20 dark:text-emerald-400",
    comingSoon: true,
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/10 absolute top-[-120px] left-1/2 h-[360px] w-[360px] -translate-x-1/2 rounded-full blur-3xl" />
        <div className="absolute right-[-120px] bottom-20 h-[280px] w-[280px] rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 w-full">
        <div className="container mx-auto px-4 pt-4 md:px-6">
          <div className="bg-background/80 supports-[backdrop-filter]:bg-background/50 border-border/60 mx-auto flex h-12 max-w-3xl items-center gap-1 rounded-full border px-2 shadow-sm backdrop-blur-xl">
            <Link href="/" className="flex items-center gap-2 pr-3 pl-2">
              <Code className="h-4 w-4 text-sky-500" />
              <span className="text-sm font-semibold tracking-tight">
                SyncSnap
              </span>
            </Link>

            <span className="bg-border/60 mx-1 hidden h-4 w-px md:block" />

            <nav className="text-muted-foreground hidden items-center text-[13px] md:flex">
              <Link
                href="#features"
                className="hover:text-foreground rounded-full px-3 py-1.5 transition-colors duration-200"
              >
                Features
              </Link>
              <Link
                href="#pricing"
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
        <section className="w-full py-14 md:py-20 lg:py-24">
          <div className="container mx-auto grid items-center gap-12 px-4 md:px-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="animate-in fade-in slide-in-from-bottom-3 space-y-7 duration-700">
              <Badge
                variant="outline"
                className="w-fit rounded-full border-sky-500/30 bg-sky-500/10 px-3 py-1 text-sky-700 dark:text-sky-300 [&>svg]:size-2"
              >
                <Circle className="fill-sky-500 text-sky-500" />
                Built for modern product teams
              </Badge>
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
                  Cross-device uploads with a developer-first experience
                </h1>
                <p className="text-muted-foreground max-w-xl text-base leading-relaxed md:text-lg">
                  SyncSnap helps users move from desktop to mobile capture in
                  seconds. You ship a polished upload flow with fewer edge cases
                  and no separate mobile app.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="cursor-pointer bg-sky-600 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700"
                  >
                    Start free
                  </Button>
                </Link>
                <Link
                  href="https://docs.syncsnap.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Read docs
                  </Button>
                </Link>
              </div>
              <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/8 px-3 py-1.5 transition-colors hover:bg-sky-500/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-500" />
                  &lt;5 min integration
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/8 px-3 py-1.5 transition-colors hover:bg-violet-500/15">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />0
                  apps for users
                </span>
              </div>
            </div>

            <div className="relative pl-10">
              <div className="animate-timeline-line absolute left-[7px] top-3 bottom-3 w-px bg-border" />

              <div className="animate-timeline-step-1 relative pb-8">
                <span className="animate-timeline-dot-1 absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full bg-sky-500 ring-4 ring-sky-500/15" />
                <p className="text-xs font-medium tracking-wide text-sky-700 uppercase dark:text-sky-300">
                  Step 01
                </p>
                <h3 className="mt-1.5 text-lg font-semibold">Embed once</h3>
                <p className="text-muted-foreground mt-1.5 max-w-sm text-sm leading-relaxed">
                  Add SyncSnap SDK and render one component where uploads begin.
                </p>
              </div>

              <div className="animate-timeline-step-2 relative pb-8">
                <span className="animate-timeline-dot-2 absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full bg-violet-500 ring-4 ring-violet-500/15" />
                <p className="text-xs font-medium tracking-wide text-violet-700 uppercase dark:text-violet-300">
                  Step 02
                </p>
                <h3 className="mt-1.5 text-lg font-semibold">Capture anywhere</h3>
                <p className="text-muted-foreground mt-1.5 max-w-sm text-sm leading-relaxed">
                  Users scan a QR and switch to their phone for camera-friendly uploads.
                </p>
              </div>

              <div className="animate-timeline-step-3 relative">
                <span className="animate-timeline-dot-3 absolute -left-[33px] top-1 h-3.5 w-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/15" />
                <p className="text-xs font-medium tracking-wide text-emerald-700 uppercase dark:text-emerald-300">
                  Step 03
                </p>
                <h3 className="mt-1.5 text-lg font-semibold">Continue your flow</h3>
                <p className="text-muted-foreground mt-1.5 max-w-sm text-sm leading-relaxed">
                  Files stream back to your app and users continue without friction.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Integrate in minutes
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                Two files. A few lines each. That&apos;s all it takes to add cross-device uploads to your app.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-5xl gap-5 lg:grid-cols-2">
              <div className="group relative">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-sky-500/20 bg-sky-500/10">
                    <Terminal className="h-3.5 w-3.5 text-sky-500" />
                  </span>
                  <span className="text-sm font-medium">Backend — route handler</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-border/70 bg-zinc-950 dark:bg-zinc-900">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-3 text-xs text-white/40">api/syncsnap/[...syncsnap]/route.ts</span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                    <code>
                      <span className="text-violet-400">import</span>
                      <span className="text-zinc-300">{" { SyncsnapServer } "}</span>
                      <span className="text-violet-400">from</span>
                      <span className="text-emerald-400">{" \"syncsnap\""}</span>
                      <span className="text-zinc-500">;</span>
                      {"\n"}
                      <span className="text-violet-400">import</span>
                      <span className="text-zinc-300">{" { createRouteHandler } "}</span>
                      <span className="text-violet-400">from</span>
                      <span className="text-emerald-400">{" \"syncsnap/next\""}</span>
                      <span className="text-zinc-500">;</span>
                      {"\n\n"}
                      <span className="text-violet-400">const</span>
                      <span className="text-sky-300">{" client "}</span>
                      <span className="text-violet-400">{"= new "}</span>
                      <span className="text-amber-300">SyncsnapServer</span>
                      <span className="text-zinc-300">()</span>
                      <span className="text-zinc-500">;</span>
                      {"\n\n"}
                      <span className="text-violet-400">{"export const"}</span>
                      <span className="text-zinc-300">{" { "}</span>
                      <span className="text-sky-300">GET</span>
                      <span className="text-zinc-300">{", "}</span>
                      <span className="text-sky-300">POST</span>
                      <span className="text-zinc-300">{" } "}</span>
                      <span className="text-violet-400">{"= "}</span>
                      <span className="text-amber-300">createRouteHandler</span>
                      <span className="text-zinc-300">{"({"}</span>
                      {"\n"}
                      <span className="text-zinc-300">{"  "}</span>
                      <span className="text-sky-300">client</span>
                      <span className="text-zinc-500">,</span>
                      {"\n"}
                      <span className="text-zinc-300">{"  "}</span>
                      <span className="text-sky-300">onCompleted</span>
                      <span className="text-zinc-300">{": "}</span>
                      <span className="text-violet-400">async</span>
                      <span className="text-zinc-300">{" (job, presigned) "}</span>
                      <span className="text-violet-400">{"=> "}</span>
                      <span className="text-zinc-300">{"({"}</span>
                      {"\n"}
                      <span className="text-zinc-300">{"    "}</span>
                      <span className="text-sky-300">jobId</span>
                      <span className="text-zinc-300">{": job.id"}</span>
                      <span className="text-zinc-500">,</span>
                      {"\n"}
                      <span className="text-zinc-300">{"    "}</span>
                      <span className="text-sky-300">downloadUrl</span>
                      <span className="text-zinc-300">{": presigned?.url"}</span>
                      <span className="text-zinc-500">,</span>
                      {"\n"}
                      <span className="text-zinc-300">{"  })"}</span>
                      <span className="text-zinc-500">,</span>
                      {"\n"}
                      <span className="text-zinc-300">{"})"}</span>
                      <span className="text-zinc-500">;</span>
                    </code>
                  </pre>
                </div>
              </div>
              <div className="group relative">
                <div className="mb-3 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md border border-violet-500/20 bg-violet-500/10">
                    <Code className="h-3.5 w-3.5 text-violet-500" />
                  </span>
                  <span className="text-sm font-medium">Frontend — upload button</span>
                </div>
                <div className="overflow-hidden rounded-xl border border-border/70 bg-zinc-950 dark:bg-zinc-900">
                  <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                    <span className="ml-3 text-xs text-white/40">page.tsx</span>
                  </div>
                  <pre className="overflow-x-auto p-4 text-[13px] leading-relaxed">
                    <code>
                      <span className="text-sky-300">{"<"}</span>
                      <span className="text-amber-300">SyncsnapUploadButton</span>
                      {"\n"}
                      <span className="text-zinc-300">{"  "}</span>
                      <span className="text-sky-300">onJobCreated</span>
                      <span className="text-violet-400">{"="}</span>
                      <span className="text-zinc-300">{"{(job) "}</span>
                      <span className="text-violet-400">{"=> "}</span>
                      <span className="text-zinc-300">{"{"}</span>
                      {"\n"}
                      <span className="text-zinc-300">{"    "}</span>
                      <span className="text-zinc-400">console</span>
                      <span className="text-zinc-300">.</span>
                      <span className="text-amber-300">log</span>
                      <span className="text-zinc-300">(</span>
                      <span className="text-emerald-400">{`"Job created:"`}</span>
                      <span className="text-zinc-300">{", job)"}</span>
                      <span className="text-zinc-500">;</span>
                      {"\n"}
                      <span className="text-zinc-300">{"  }}"}</span>
                      {"\n"}
                      <span className="text-zinc-300">{"  "}</span>
                      <span className="text-sky-300">onCompleted</span>
                      <span className="text-violet-400">{"="}</span>
                      <span className="text-zinc-300">{"{(job, result) "}</span>
                      <span className="text-violet-400">{"=> "}</span>
                      <span className="text-zinc-300">{"{"}</span>
                      {"\n"}
                      <span className="text-zinc-300">{"    "}</span>
                      <span className="text-zinc-400">console</span>
                      <span className="text-zinc-300">.</span>
                      <span className="text-amber-300">log</span>
                      <span className="text-zinc-300">(</span>
                      <span className="text-emerald-400">{`"Completed"`}</span>
                      <span className="text-zinc-300">{", job, result)"}</span>
                      <span className="text-zinc-500">;</span>
                      {"\n"}
                      <span className="text-zinc-300">{"  }}"}</span>
                      {"\n"}
                      <span className="text-sky-300">{"/>"}</span>
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Built for shipping teams
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                Purpose-built primitives for upload-heavy products, with an
                interface designed to feel native to modern developer tools.
              </p>
            </div>
            <div className="mt-10 grid gap-10 lg:grid-cols-2">
              {[coreFeatures.slice(0, 3), coreFeatures.slice(3)].map(
                (group, groupIndex) => (
                  <div key={groupIndex} className="space-y-6">
                    {group.map((feature) => (
                      <div
                        key={feature.title}
                        className="group border-border/70 border-b pb-5"
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-md transition-transform duration-300 group-hover:-translate-y-0.5 ${feature.iconClassName}`}
                          >
                            <feature.icon className="h-4.5 w-4.5" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="font-semibold">{feature.title}</h3>
                              {feature.comingSoon ? (
                                <Badge
                                  variant="outline"
                                  className="rounded-full border-amber-500/30 bg-amber-500/10 px-2 py-0 text-xs text-amber-700 dark:text-amber-300"
                                >
                                  Coming soon
                                </Badge>
                              ) : null}
                            </div>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Simple pricing
              </h2>
              <p className="text-muted-foreground mt-4 text-base leading-relaxed">
                Start free, validate your flow, and scale when you need more
                control.
              </p>
            </div>
            <div className="mx-auto mt-10 grid max-w-4xl gap-5 sm:grid-cols-2">
              <div className="relative flex flex-col gap-6 rounded-xl border border-sky-500/30 bg-sky-500/5 p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
                <Badge
                  variant="outline"
                  className="w-fit rounded-full border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 [&>svg]:size-3"
                >
                  <Check className="h-3 w-3" />
                  Most popular
                </Badge>
                <div>
                  <h3 className="text-xl font-semibold">Free</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Everything you need to go live quickly.
                  </p>
                </div>
                <ul className="text-muted-foreground space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    Unlimited projects
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 shrink-0 text-emerald-500" />
                    Up to 10 MB per file
                  </li>
                </ul>
                <Link href="/dashboard" className="mt-auto">
                  <Button className="w-full cursor-pointer bg-sky-600 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700">
                    Get started
                  </Button>
                </Link>
              </div>
              <div className="bg-card/70 border-border/70 flex flex-col gap-4 rounded-xl border border-dashed p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-sm">
                <h3 className="text-xl font-semibold">Scale</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dedicated limits, extended audit logs, and premium support for
                  larger teams.
                </p>
                <Badge
                  variant="outline"
                  className="w-fit rounded-full border-violet-500/30 bg-violet-500/10 text-violet-700 dark:text-violet-300"
                >
                  Contact us
                </Badge>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-14 md:py-18">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-card/80 border-border/70 relative overflow-hidden rounded-2xl border p-10 text-center transition-all duration-300 hover:shadow-sm md:p-14">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-7 -left-7 h-16 w-16 rounded-full border border-sky-500/30 bg-sky-500/10" />
                <div className="absolute top-10 right-14 h-3 w-14 rounded-full bg-violet-500/30" />
                <div className="absolute right-10 bottom-12 h-12 w-12 rounded-full border border-emerald-500/35 bg-emerald-500/12" />
                <div className="absolute bottom-8 left-1/4 h-2.5 w-2.5 rounded-full bg-amber-500/70" />
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Ship a better upload experience this sprint
              </h2>
              <p className="text-muted-foreground mx-auto mt-3 max-w-[640px] text-sm leading-relaxed md:text-base">
                Add SyncSnap once and deliver a polished cross-device flow your
                users actually enjoy.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="cursor-pointer bg-sky-600 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-sky-700"
                  >
                    Start free
                  </Button>
                </Link>
                <Link
                  href="https://docs.syncsnap.xyz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    className="cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                  >
                    Explore docs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
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
