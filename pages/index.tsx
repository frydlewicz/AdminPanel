import Head from 'next/head';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import styles from '../styles/index.module.less';

export default function Home() {
    return (
        <div>
            <Navbar />
            <Head>
                <title>ADMIN PANEL</title>
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
