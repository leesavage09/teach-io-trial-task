import mongoose from "mongoose"

export const connect = async () => {
    if (!process.env.MONGO_URI) throw Error("you must set MONGO_URI in the environment var")

    return await mongoose.connect(process.env.MONGO_URI)
}
