import type { Metadata } from "next";
import { SiteFooter } from "../_components/marketing/site-footer";
import { SiteNavbar } from "../_components/marketing/site-navbar";

export const metadata: Metadata = {
  title: "Terms of Service | SyncSnap",
  description: "Terms of Service for using SyncSnap.",
};

export default function TermsPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip">
      <SiteNavbar />

      <main className="flex-1">
        <div className="container mx-auto max-w-3xl px-4 py-12 md:px-6 md:py-16">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            SyncSnap Terms of Service
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Effective date: February 24, 2026
          </p>

          <section className="mt-8 space-y-3">
            <h2 className="text-xl font-semibold">1. Use of Service</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              By using SyncSnap, you agree to use the service in compliance with
              applicable laws and these terms.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">
              2. Free Plan and Usage Limits
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              SyncSnap may add, remove, or change free plan features and usage
              limits at any time, with or without notice.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">
              3. User Content and Responsibility
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              You are solely responsible for any files or data you or your users
              upload, store, or transmit through SyncSnap.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">4. Disclaimer of Liability</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              SyncSnap is not liable for any type of files or data uploaded by
              users, including any loss, corruption, misuse, or unauthorized
              access related to user-submitted content.
            </p>
          </section>

          <section className="mt-6 space-y-3">
            <h2 className="text-xl font-semibold">5. Changes to These Terms</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We may update these terms from time to time. Continued use of
              SyncSnap after updates means you accept the revised terms.
            </p>
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
