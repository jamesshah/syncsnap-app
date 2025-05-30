import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { projects_table, type Project } from "~/server/db/schema";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  getProjects: protectedProcedure.query<Project[]>(({ ctx }) => {
    const { userId } = ctx.auth;

    return ctx.db
      .select()
      .from(projects_table)
      .where(eq(projects_table.userId, userId));
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
