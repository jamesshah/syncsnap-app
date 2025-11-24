import {
  text,
  timestamp,
  boolean,
  singlestoreTableCreator,
  index,
} from "drizzle-orm/singlestore-core";

export const createTable = singlestoreTableCreator(
  (name) => `syncsnap-app_${name}`,
);

export const projects_table = createTable(
  "projects",
  {
    publicId: text("public_id").primaryKey(), // TODO:  generate it here?
    name: text("name").notNull(),
    userId: text("user_id").notNull(),
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => {
    return [index("user_id_index").on(t.userId)];
  },
);

export const api_keys_table = createTable(
  "api_keys",
  {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    projectId: text("project_id").notNull(),
    privateKey: text("private_key").notNull(),
    isDeleted: boolean("is_deleted").notNull().default(false),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => {
    return [index("project_id_index").on(t.projectId)];
  },
);

export type Project = typeof projects_table.$inferSelect;

export type ApiKey = typeof api_keys_table.$inferSelect;
