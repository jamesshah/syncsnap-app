import { SignInButton } from "@clerk/nextjs";

export default function HomePage() {
  return (
    <>
      <SignInButton forceRedirectUrl={"/dashboard"} />
      <footer className="mt-16 text-sm text-neutral-500">
        © {new Date().getFullYear()} SyncSnap. All rights reserved.
      </footer>
    </>
  );
}
