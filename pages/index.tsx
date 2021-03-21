import { NextPageContext } from 'next';
import Head from 'next/head';
import basicAuthMiddleware from 'nextjs-basic-auth-middleware';

import Navbar from '../components/navbar';
import Footer from '../components/footer';

import styles from '../styles/index.less';


function Home() {
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

export async function getServerSideProps(ctx: NextPageContext) {
    await basicAuthMiddleware(ctx.req, ctx.res, {
        users: [
            {
                name: 'admin',
                password: 'admin',
            },
        ],
    });

    return {};
}

export default Home;
