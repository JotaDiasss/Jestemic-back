import { defineConfig } from "drizzle-kit"

export default defineConfig({
    schema: "./src/database/postgres/schemas/*.ts",
    out: "./drizzle/migrations",
    dialect: "postgresql",
    dbCredentials: {
        host: "localhost",
        port: 5432,
        user: "admin",
        password: "admin123",
        database: "jestemic",
        ssl: false
    },
})