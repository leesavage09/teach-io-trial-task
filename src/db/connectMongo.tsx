import mongoose from "mongoose"

export const connectMongo = async () => {
    if (!process.env.MONGO_URI) throw Error("you must set MONGO_URI in the environment variables")

    return await mongoose.connect(process.env.MONGO_URI)
}
