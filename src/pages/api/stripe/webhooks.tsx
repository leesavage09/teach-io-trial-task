import { connectMongo } from "@components/db/connectMongo"
import { Charge, ChargeModel } from "@components/db/models/charge"
import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

const handleChargeSucceeded = async (charge: Stripe.Charge) => {
    const data: Charge = {
        chargeID: charge.id,
        // TODO there might be edge cases here when the type is forded to a string
        customerID: charge.customer as string,
        amount: charge.amount_captured,
        currency: charge.currency,
        created: charge.created,
        refunded: charge.refunded
    }
    await connectMongo()
    const model = new ChargeModel(data)
    model.save()
}

const handleChargeRefunded = async (refund: Stripe.Refund) => {
    await connectMongo()
    // TODO missing type info here
    const charge = await ChargeModel.findOne({ chargeID: refund.id })
    if (!charge) throw Error("unable to update DB refund received for unknown charge")
    charge.refunded = true
    charge.save()
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // TODO no defense. Step 4: Secure your webhooks https://stripe.com/docs/webhooks#webhook-endpoint-four
    const event = req.body as Stripe.Event

    if (event.type === "charge.succeeded") handleChargeSucceeded(event.data.object as Stripe.Charge)
    if (event.type === "charge.refunded") handleChargeRefunded(event.data.object as Stripe.Refund)

    res.status(200).json(null)
}
