import { auth, clerkClient } from "@clerk/nextjs/server";
import { Button } from "~/components/ui/button";
import { mockProjects } from "~/lib/mock-data";
import { db } from "~/server/db";
import { projects_table } from "~/server/db/schema";

export default function DevMode() {
  return (
    <div className="flex flex-col gap-4">
      <h1>Dev Mode</h1>
      <form
        action={async () => {
          "use server";

          const user = await auth();

          if (
            !user.userId ||
            !(await (await clerkClient()).users.getUser(user.userId))
              .privateMetadata.admin
          ) {
            throw new Error("User not found");
          }

          await db
            .insert(projects_table)
            .values(mockProjects.map((_p) => ({ ..._p, userId: user.userId })));
        }}
      >
        <Button type="submit">Populate Insert projects</Button>
      </form>
    </div>
  );
}
