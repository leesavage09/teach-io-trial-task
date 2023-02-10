import { connect } from "@components/db/connect"
import { ChargeModel } from "@components/db/models/charge"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET") {
        await connect()
        const results = await ChargeModel.find({})

        res.status(200).json(results)
    }

    res.status(404).send(null)
}

export default handler
