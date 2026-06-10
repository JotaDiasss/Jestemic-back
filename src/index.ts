import app from "./app.js"
import { env } from "./config/env.js"
import { connectMongoDB } from "./database/mongodb/conection.js"
import { postgresDB } from "./database/postgres/connection.js"
import { sql } from 'drizzle-orm'

async function startServer() {
    try {
        await postgresDB.execute( sql`SELECT 1` )
        console.log("PostegreSQL conectado")

        await connectMongoDB()

        app.listen(env.PORT, () => {
            console.log(`servidor rodando em http://localhost:${env.PORT}`)
        })
    } catch (err) {
        console.error(`Erro ao iniciar servidor: ${err}`)
        process.exit(1)
    }
}

startServer()