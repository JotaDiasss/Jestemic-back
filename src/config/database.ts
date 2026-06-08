import mongoose from "mongoose";

export async function connectDataBase() {
    try{
        await mongoose.connect(
            "mongodb://localhost:3009/Jestemic"
        );

        console.log("MongoDB conectado");
    } catch(err) {
        console.error(err);
    }
}