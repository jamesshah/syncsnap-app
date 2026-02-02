import { and, desc, eq, ne } from "drizzle-orm";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import {
  api_keys_table,
  projects_table,
  type Project,
} from "~/server/db/schema";
import { nanoid } from "nanoid";
import { TRPCError } from "@trpc/server";

export const projectRouter = createTRPCRouter({
  /**
   * Get all projects for the current user
   * @returns All projects for the current user
   * @throws TRPCError if the projects cannot be retrieved
   */
  getProjects: protectedProcedure.query<Project[]>(({ ctx }) => {
    const { userId } = ctx.auth;

    try {
      return ctx.db
        .select()
        .from(projects_table)
        .orderBy(desc(projects_table.createdAt))
        .where(
          and(
            eq(projects_table.userId, userId),
            eq(projects_table.isDeleted, false),
          ),
        );
    } catch (error) {
      console.error("Error getting projects:", error);
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Failed to get projects",
      });
    }
  }),

  /**
   * Get a project by publicId
   * @param input - The publicId of the project to get
   * @returns The project
   * @throws TRPCError if the project is not found or if the project cannot be retrieved
   */
  getProject: protectedProcedure
    .input(
      z.object({
        publicId: z.string(),
      }),
    )
    .query<Project>(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { publicId } = input;

      // validate publicId is not empty
      if (!publicId.trim()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project publicId is required",
        });
      }

      try {
        const project = await ctx.db
          .select()
          .from(projects_table)
          .where(
            and(
              eq(projects_table.publicId, publicId),
              eq(projects_table.userId, userId),
              eq(projects_table.isDeleted, false),
            ),
          )
          .limit(1);

        if (!project[0]) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Project not found",
          });
        }

        return project[0];
      } catch (error) {
        console.error("Error getting project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to get project",
        });
      }
    }),

  /**
   * Create a new project
   * @param input - The name of the project to create
   * @returns The publicId of the created project
   * @throws TRPCError if the project name is empty or if a project with the same name already exists or if the project cannot be created
   */
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string(),
      }),
    )
    .mutation<string>(async ({ ctx, input }) => {
      const { name } = input;

      // validate name is not empty
      if (!name.trim()) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Project name is required",
        });
      }

      // check if another project with the same name exists for this user
      const [existingProject] = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.userId, ctx.auth.userId),
            eq(projects_table.name, name),
          ),
        )
        .limit(1);

      if (existingProject) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A project with this name already exists",
        });
      }

      // create a public_id using nanoid library
      const publicId = nanoid(10);

      try {
        // insert new project in DB
        await ctx.db.insert(projects_table).values({
          userId: ctx.auth.userId,
          name,
          publicId,
        });

        return publicId;
      } catch (error) {
        console.error("Error creating project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create project",
        });
      }
    }),

  /**
   * Update a project name
   * @param input - The publicId and name of the project to update
   * @returns The publicId of the updated project
   * @throws TRPCError if the project is not found or if the project cannot be updated
   */
  updateProject: protectedProcedure
    .input(
      z.object({
        publicId: z.string(),
        name: z.string(),
      }),
    )
    .mutation<string>(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { publicId, name } = input;

      // Verify project exists and belongs to user
      const [project] = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.publicId, publicId),
            eq(projects_table.userId, userId),
            eq(projects_table.isDeleted, false),
          ),
        )
        .limit(1);

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      // Check if another project with the same name exists for this user
      const [existingProject] = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.userId, userId),
            eq(projects_table.name, name),
            ne(projects_table.publicId, publicId),
            eq(projects_table.isDeleted, false),
          ),
        )
        .limit(1);

      if (existingProject) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "A project with this name already exists",
        });
      }

      try {
        await ctx.db
          .update(projects_table)
          .set({
            name,
            updatedAt: new Date(),
          })
          .where(eq(projects_table.publicId, publicId));

        return publicId;
      } catch (error) {
        console.error("Error updating project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to update project",
        });
      }
    }),

  /**
   * Delete a project and all associated api keys
   * @param input - The publicId of the project to delete
   * @returns The publicId of the deleted project
   * @throws TRPCError if the project is not found or if the project cannot be deleted
   */
  deleteProject: protectedProcedure
    .input(
      z.object({
        publicId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { userId } = ctx.auth;
      const { publicId } = input;

      const [project] = await ctx.db
        .select()
        .from(projects_table)
        .where(
          and(
            eq(projects_table.publicId, publicId),
            eq(projects_table.userId, userId),
            eq(projects_table.isDeleted, false),
          ),
        )
        .limit(1);

      if (!project) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Project not found",
        });
      }

      try {
        // mark all api keys for this project as deleted
        await ctx.db
          .update(api_keys_table)
          .set({
            isDeleted: true,
            updatedAt: new Date(),
          })
          .where(eq(api_keys_table.projectId, publicId));

        // mark project as deleted
        await ctx.db
          .update(projects_table)
          .set({
            isDeleted: true,
            updatedAt: new Date(),
          })
          .where(eq(projects_table.publicId, publicId));
      } catch (error) {
        console.error("Error deleting project:", error);
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to delete project",
        });
      }
    }),
});
