/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head"
import styles from "@components/styles/Home.module.scss"
import { useEffect, useState } from "react"
import { Charge } from "@components/db/models/charge"
import { ChargeListItem } from "@components/components/ChargeListItem"
import axios from "axios"

export default function Home() {
    const [charges, setCharges] = useState<[Charge]>()

    const update = () => {
        axios.get("api/charges").then((result) => {
            setCharges(result.data)
        })
    }

    const refund = (chargeID: string) => {
        axios.get("api/stripe/refund/" + chargeID).then(() => {
            // TODO less than ideal way to update the UI after the webhook comes back
            setTimeout(() => {
                update()
            }, 1500)
        })
    }

    useEffect(() => update(), [])

    return (
        <>
            <Head>
                <title>teach-io-trial-task</title>
                <meta name="description" content="teach-io-trial-task" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <button className={styles.refreshButton}
                    onClick={update}>Refresh Charges</button>
                <h1>Charges</h1>
                <ul>
                    {charges && charges.map((charge) => (
                        <ChargeListItem
                            key={charge.chargeID}
                            charge={charge}
                            onRefund={refund}
                        />
                    ))}
                </ul>
            </main>
        </>
    )
}
