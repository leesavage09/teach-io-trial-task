import { connectMongo } from "@components/db/connectMongo"
import { ChargeModel } from "@components/db/models/charge"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        await connectMongo()
        const results = await ChargeModel.find({}).sort({ created: -1 })

        res.status(200).json(results)
    }

    res.status(404).send(null)
}

export default handler
