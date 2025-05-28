import type { Projects } from "~/server/db/schema";

export const mockProjects: Projects[] = [
  {
    publicId: "project-2",
    name: "Project 2",
    userId: "",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    publicId: "project-3",
    name: "Project 3",
    userId: "",
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
