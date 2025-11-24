import { SignedOut, SignInButton, SignedIn, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "~/components/ui/button";
import { ModeToggle } from "../_components/theme-toggle";

export default async function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center">
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-14 items-center justify-between">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="font-bold">SyncSnap</span>
            </Link>
          </div>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/features"
              className="hover:text-foreground/80 transition-colors"
            >
              Features
            </Link>
            <Link
              href="/pricing"
              className="hover:text-foreground/80 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              className="hover:text-foreground/80 transition-colors"
            >
              Documentation
            </Link>
            <Link
              href="/blog"
              className="hover:text-foreground/80 transition-colors"
            >
              Blog
            </Link>
          </nav>
          <div className="ml-auto flex items-center space-x-4">
            <ModeToggle />
            <SignedOut>
              <SignInButton oauthFlow="redirect" />
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Seamless Cross-Device File Upload
                </h1>
                <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                  Monitor, analyze, and optimize your API performance with our
                  comprehensive developer platform.
                </p>
              </div>
              <div className="flex items-center justify-center space-x-4">
                <form
                  action={async () => {
                    "use server";
                    const session = await auth();
                    if (!session.userId) {
                      return redirect("/sign-in");
                    }
                    return redirect("/dashboard");
                  }}
                >
                  <Button size="lg" className="cursor-pointer gap-2">
                    Go to Dashboard
                  </Button>
                </form>
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
    </div>
  );
}
