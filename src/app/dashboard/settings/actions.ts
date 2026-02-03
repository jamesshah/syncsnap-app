"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { eq, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { api_keys_table, projects_table } from "~/server/db/schema";
import { db } from "~/server/db";

export type DeleteAccountResult =
  | { success: true }
  | { success: false; error: string };

export async function deleteAccountAction(): Promise<DeleteAccountResult> {
  const session = await auth();

  if (!session.userId) {
    return { success: false, error: "Not authenticated" };
  }

  const userId = session.userId;

  try {
    await db.transaction(async (tx) => {
      const userProjects = await tx
        .select({ publicId: projects_table.publicId })
        .from(projects_table)
        .where(eq(projects_table.userId, userId));

      const projectIds = userProjects.map((p) => p.publicId);

      if (projectIds.length > 0) {
        await tx
          .delete(api_keys_table)
          .where(inArray(api_keys_table.projectId, projectIds));
      }

      await tx.delete(projects_table).where(eq(projects_table.userId, userId));
    });

    const client = await clerkClient();
    await client.users.deleteUser(userId);

    revalidatePath("/", "layout");
    return { success: true };
  } catch (err) {
    console.error("Delete account error:", err);
    const message =
      err instanceof Error ? err.message : "Failed to delete account";
    return { success: false, error: message };
  }
}
