import Stripe from "stripe"

export const connectStripe = () => {
    if (!process.env.STRIPE_SK) throw Error("you must set STRIPE_SK in the environment var")

    return new Stripe(process.env.STRIPE_SK, {
        apiVersion: "2022-11-15"
    })
}
