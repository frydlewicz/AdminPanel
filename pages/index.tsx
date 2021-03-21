import { NextPageContext } from 'next';
import Head from 'next/head';

import { authMiddleware } from '../services/auth';
import Navbar from '../components/navbar';
import Footer from '../components/footer';

import styles from '../styles/index.less';

export function getServerSideProps(ctx: NextPageContext) {
    return authMiddleware(ctx);
}

export default function Home() {
    return (
        <div>
            <Navbar />
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>
                    AdminPanel
                </h1>

                <p className={styles.description}>
                    server performance metrics
                </p>
            </main>
            <Footer />
        </div>
    );
}
