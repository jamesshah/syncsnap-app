import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                SyncSnap
              </h1>
              <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
                Seamless Cross-Device File Upload
              </p>
            </div>
            <div className="space-x-4">
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
                <button type="submit">Get Started</button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
