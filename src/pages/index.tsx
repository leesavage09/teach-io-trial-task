/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head"
import styles from "@components/styles/Home.module.scss"
import { useEffect, useState } from "react"
import { Charge } from "@components/db/models/charge"
import axios from "axios"

export default function Home() {
    const [charges, setCharges] = useState<[Charge]>()
    const [loading, setLoading] = useState(false)

    const update = () => {
        axios.get("api/charges").then((result) => {
            setCharges(result.data)
            setLoading(false)
        })
    }

    const refund = (chargeID: string) => {
        axios.get("api/stripe/refund/" + chargeID).then(() => {
            // TODO less than ideal way to update the UI after the webhook comes back
            setLoading(true)
            setTimeout(() => {
                update()
            }, 1000)
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
                <button onClick={update}>Refresh Charges</button>
                <h1>Charges</h1>
                <ul>
                    {charges && charges.map((charge) => (
                        <li key={charge.chargeID}>
                            <h2>{charge.chargeID}</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>customerID</td>
                                        <td>{charge.customerID}</td>
                                    </tr>
                                    <tr>
                                        <td>amount</td>
                                        {/* TODO just rendering £. will need better rendering */}
                                        <td>£{charge.amount / 100}</td>
                                    </tr>
                                    <tr>
                                        <td>currency</td>
                                        <td>{charge.currency}</td>
                                    </tr>
                                    <tr>
                                        <td>created</td>
                                        <td>{new Date(charge.created * 1000).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <p>{charge.refunded && "This Charge has been refunded"}</p>
                            {!charge.refunded && (
                                <button
                                    disabled={loading}
                                    onClick={() => refund(charge.chargeID)}
                                >
                                    Refund
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            </main>
        </>
    )
}
