import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { HydrateClient } from "~/trpc/server";
import { DashboardHeader } from "@/_components/dashboard/header";
import { Badge } from "~/components/ui/badge";
import Image from "next/image";
import { DeleteAccountDialog } from "./delete-account-dialog";

function getProviderLabel(type: string): string {
  const normalized = type.replace(/^oauth_/, "");
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export default async function DashboardSettingsPage() {
  const session = await auth();

  if (!session.userId) {
    return redirect("/sign-in");
  }

  const client = await clerkClient();
  let user;
  try {
    user = await client.users.getUser(session.userId);
  } catch {
    return redirect("/sign-in");
  }

  const fullName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || null;
  const primaryEmailId = user.primaryEmailAddressId ?? null;

  return (
    <HydrateClient>
      <div className="flex h-screen flex-col">
        <DashboardHeader />
        <div className="flex-1 overflow-y-auto">
          <div className="container mx-auto max-w-3xl px-4 py-8 sm:px-6">
            <h1 className="text-2xl font-bold">Account</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Manage your account information
            </p>

            {/* Profile */}
            <section className="border-border mt-8 border-b pb-8">
              <h2 className="text-base font-semibold">Profile</h2>
              <div className="mt-4 flex items-center gap-4">
                <div className="bg-muted relative h-14 w-14 shrink-0 overflow-hidden rounded-full">
                  {user.imageUrl ? (
                    <Image
                      src={user.imageUrl}
                      alt={fullName ?? "Profile"}
                      width={56}
                      height={56}
                      className="object-cover"
                    />
                  ) : (
                    <span className="text-muted-foreground flex h-full w-full items-center justify-center text-lg font-medium">
                      {fullName
                        ? fullName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()
                        : (user.username?.[0]?.toUpperCase() ?? "?")}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <p className="font-medium">{fullName ?? "No name set"}</p>
                  {user.username && (
                    <p className="text-muted-foreground text-sm">
                      {user.username}
                    </p>
                  )}
                </div>
              </div>
            </section>

            {/* Email Addresses */}
            <section className="border-border mt-8 border-b pb-8">
              <h2 className="text-base font-semibold">Email Addresses</h2>
              <div className="mt-4 space-y-3">
                {user.emailAddresses.map((email) => (
                  <div
                    key={email.id}
                    className="flex flex-wrap items-center gap-2 text-sm"
                  >
                    <span>{email.emailAddress}</span>
                    <div className="flex flex-wrap gap-1.5">
                      {email.id === primaryEmailId && (
                        <Badge variant="destructive">Primary</Badge>
                      )}
                      {email.linkedTo?.map((link) => (
                        <Badge
                          key={link.id}
                          variant="secondary"
                          className="bg-muted text-muted-foreground"
                        >
                          {getProviderLabel(link.type)}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Accounts */}
            <section className="border-border mt-8 border-b pb-8">
              <h2 className="text-base font-semibold">Accounts</h2>
              <div className="mt-4 space-y-3">
                {user.externalAccounts.length === 0 ? (
                  <p className="text-muted-foreground text-sm">
                    No connected accounts
                  </p>
                ) : (
                  user.externalAccounts.map((account) => (
                    <div
                      key={account.id}
                      className="flex items-center gap-2 text-sm"
                    >
                      <AccountIcon provider={account.provider} />
                      <span className="text-muted-foreground">
                        {account.username ??
                          account.emailAddress ??
                          account.provider}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </section>

            {/* Danger Zone */}
            <section className="mt-8">
              <h2 className="text-base font-semibold">Danger Zone</h2>
              <div className="border-border border-destructive/30 bg-muted/30 mt-4 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="font-medium">Delete your account</h3>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Delete your account and all its associated data.
                  </p>
                </div>
                <DeleteAccountDialog />
              </div>
            </section>
          </div>
        </div>
      </div>
    </HydrateClient>
  );
}

function AccountIcon({ provider }: { provider: string }) {
  const p = provider.toLowerCase();
  if (p.includes("github")) {
    return (
      <svg
        className="text-muted-foreground h-5 w-5"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
  return (
    <span className="text-muted-foreground bg-muted flex h-5 w-5 items-center justify-center rounded text-xs font-medium">
      {provider[0]?.toUpperCase() ?? "?"}
    </span>
  );
}
