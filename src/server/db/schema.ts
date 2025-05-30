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

export type Project = typeof projects_table.$inferSelect;
