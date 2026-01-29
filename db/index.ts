import Database from "better-sqlite3";
import { resolve } from "path";
import { categoriesTable, likesTable, postsTable, usersTable } from "./schemas";
import { drizzle } from "drizzle-orm/better-sqlite3";

const sqliteDatabasePath = resolve(process.cwd(), "db.sqlite");
const sqliteDatabase = new Database(sqliteDatabasePath);

export const drizzleDb = drizzle(sqliteDatabase, {
  schema: {
    posts: postsTable,
    categories: categoriesTable,
    users: usersTable,
    likes: likesTable,
  },
  logger: true,
});
