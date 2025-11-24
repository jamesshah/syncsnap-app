import { and, desc, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { projects_table, type Project } from "~/server/db/schema";
import { nanoid } from "nanoid";

export const projectRouter = createTRPCRouter({
  getProjects: protectedProcedure.query<Project[]>(({ ctx }) => {
    const { userId } = ctx.auth;

    return ctx.db
      .select()
      .from(projects_table)
      .orderBy(desc(projects_table.createdAt))
      .where(eq(projects_table.userId, userId));
  }),

  getProjectById: protectedProcedure
    .input(z.string())
    .query<Project | null>(async ({ ctx, input }) => {
      const projectId = input;
      const userId = ctx.auth.userId;

      const project = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.publicId, projectId),
            eq(projects_table.userId, userId),
          ),
        )
        .limit(1)
        .then((rows) => rows[0]);

      if (!project) {
        return null;
      }

      return project;
    }),

  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      // create a public_id using nanoid library
      const publicId = nanoid(10);

      // insert new project in DB
      await ctx.db.insert(projects_table).values({
        userId: ctx.auth.userId,
        name,
        publicId,
      });

      return publicId;
    }),
});
