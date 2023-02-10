import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"

type Charge = {
    chargeID: string;
    customerID: string | Stripe.Customer | Stripe.DeletedCustomer | null;
    amount: number;
    currency: string;
    created: number;
    refunded: boolean;
}

const handleChargeSucceeded = (charge: Stripe.Charge) => {
    const data: Charge = {
        chargeID: charge.id,
        customerID: charge.customer,
        amount: charge.amount_captured,
        currency: charge.currency,
        created: charge.created,
        refunded: charge.refunded
    }

    console.log(data)

    // connected mongoose db
    // create mongoose schema for the obj
    // persist the ob

}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    // TODO no defense. Step 4: Secure your webhooks https://stripe.com/docs/webhooks#webhook-endpoint-four
    const event = req.body as Stripe.Event

    if (event.type === "charge.succeeded") handleChargeSucceeded(event.data.object as Stripe.Charge)



    res.status(200).json(null)
}
