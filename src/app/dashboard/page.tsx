import { SignedIn, SignedOut, UserButton, SignInButton } from "@clerk/nextjs";
import { HydrateClient } from "~/trpc/server";

export default function DashboardPage() {
  return (
    <HydrateClient>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <div>
            <h1>Welcome to SyncSnap. Create a new project to get started.</h1>
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </HydrateClient>
  );
}
