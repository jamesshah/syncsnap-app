import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            404 - Not Found
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[700px] md:text-xl">
            Could not find the requested resource
          </p>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link href="/">
            <Button size="lg">Return Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
