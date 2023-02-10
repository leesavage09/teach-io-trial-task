import { connectStripe } from "@components/payments/connectStripe"
import type { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === "GET" && req.query.chargeId) {
        const chargeId = req.query.chargeId as string
        const stripe = connectStripe()
        // TODO thrown error is not handled
        const refund = await stripe.refunds.create({ charge: chargeId })
        res.status(200).json(refund)
        return
    }
    res.status(404).send(null)
}

export default handler
