import Link from "next/link";
import { Github, Linkedin } from "lucide-react";

export function SiteFooter() {
  return (
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
  );
}
