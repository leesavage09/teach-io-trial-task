import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

const handleChargeSucceeded = (event: Stripe.Event) => {
    // TODO save charge to mongodb database
    console.log({ event })

}

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    const event = req.body as Stripe.Event

    if (event.type === "charge.succeeded") handleChargeSucceeded(event)



    res.status(200).json(null)
}
