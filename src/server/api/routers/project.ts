import { eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { projects, type Projects } from "~/server/db/schema";

export const projectRouter = createTRPCRouter({
  getProjects: publicProcedure.query<Projects[]>(({ ctx }) => {
    const { userId } = ctx.auth;

    return ctx.db.select().from(projects).where(eq(projects.userId, userId!));
  }),
});
