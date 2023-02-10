/* eslint-disable react/react-in-jsx-scope */
import Head from "next/head"
import styles from "/components/styles/Home.module.css"

export default function Home() {
    return (
        <>
            <Head>
                <title>teach-io-trial-task</title>
                <meta name="description" content="teach-io-trial-task" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles.description}>

                </div>
            </main>
        </>
    )
}
