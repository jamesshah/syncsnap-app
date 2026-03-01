import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "../_components/marketing/site-footer";
import { SiteNavbar } from "../_components/marketing/site-navbar";

export const metadata: Metadata = {
  title: "Privacy Policy | SyncSnap",
  description: "Privacy Policy for using SyncSnap.",
};

export default function PrivacyPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <SiteNavbar />

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

      <SiteFooter />
    </div>
  );
}
