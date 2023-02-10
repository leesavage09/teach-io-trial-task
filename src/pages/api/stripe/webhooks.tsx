import { connect } from "@components/db/connect"
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

    await connect()
    const model = new ChargeModel(data)
    model.save()
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // TODO no defense. Step 4: Secure your webhooks https://stripe.com/docs/webhooks#webhook-endpoint-four
    const event = req.body as Stripe.Event

    if (event.type === "charge.succeeded") handleChargeSucceeded(event.data.object as Stripe.Charge)



    res.status(200).json(null)
}
