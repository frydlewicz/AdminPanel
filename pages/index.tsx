import Head from 'next/head';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import styles from '../styles/Home.module.less';

export default function Home() {
    return (
        <div className={styles.container}>
            <Navbar></Navbar>
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
            <Footer></Footer>
        </div>
    );
}
