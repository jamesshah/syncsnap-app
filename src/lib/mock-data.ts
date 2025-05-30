import type { Project } from "~/server/db/schema";

export const mockProjects: Project[] = [
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
