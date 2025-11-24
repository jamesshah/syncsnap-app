import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { Plus } from "lucide-react";
import { Button } from "~/components/ui/button";

export default function Loading() {
  return (
    <div className="p-6">
      <div className="flex items-start justify-between overflow-auto">
        <h1 className="mb-6 text-2xl font-bold">Projects</h1>
        <Button className="gap-2" disabled>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-5 w-3/4" />
                </div>
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-3 w-32" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
