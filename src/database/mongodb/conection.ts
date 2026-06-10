import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://admin:admin123@localhost:27017/jestemic_logs?authSource=admin'

export async function connectMongoDB() {
    try {
        await mongoose.connect(MONGODB_URI)
        console.log('MongoDB conectado')
    } catch (error) {
        console.error('Erro ao conectar MongoDB:', error)
    }
}