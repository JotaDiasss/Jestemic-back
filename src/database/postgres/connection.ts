import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    user: 'admin',
    password: 'admin123',
    database: 'jestemic',
})

export const postgresDB = drizzle(pool)