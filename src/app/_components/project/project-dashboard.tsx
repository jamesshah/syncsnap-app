import { Download, Link, RefreshCw } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Project } from "~/server/db/schema";

export function ProjectDashboard({ project }: { project: Project }) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
      <div className="flex gap-2">
        {/* <Button variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button> */}
        {/* <Link href={`/dashboard/${project.id}/api-keys`}>
        <Button variant="outline" size="sm" className="gap-2">
          <Key className="h-4 w-4" />
          API Keys
        </Button>
      </Link> */}
      </div>
    </div>
  );
}
