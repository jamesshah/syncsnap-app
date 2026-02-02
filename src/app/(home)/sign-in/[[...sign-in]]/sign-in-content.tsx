"use client";

import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import type { Theme } from "@clerk/types";

export function SignInContent() {
  const { resolvedTheme } = useTheme();

  const appearance = {
    baseTheme:
      resolvedTheme === "dark" ? (dark as Theme["baseTheme"]) : undefined,
  };

  return (
    <div className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
      >
        <div className="bg-muted/60 absolute top-1/4 -left-40 h-72 w-72 rounded-full" />
        <div className="bg-muted/50 absolute top-2/3 -right-40 h-96 w-96 rounded-full" />
        <div className="bg-muted/40 absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full" />
      </div>
      <SignIn appearance={appearance} />
    </div>
  );
}
