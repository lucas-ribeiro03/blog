import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "sqlite",
  schema: "./db/schemas.ts",
  out: "./db/migrations",
  dbCredentials: {
    url: "./db.sqlite",
  },
});
