import React from 'react';
import Head from 'next/head';

import { healthWebsites } from '../config.json';
import { ICollection, IHealthWebsite, IPointsCollection } from '../helpers/types';
import Graph, { Type, Color } from '../components/graph';

import styles from '../styles/health.less';

export default class Health extends React.Component {
    private readonly graphs: ICollection<Graph> = {};
    private interval: NodeJS.Timeout;

    public componentDidMount(): void {
        this.update();
        this.interval = setInterval((): void => this.update(), 60000);
    }

    public componentWillUnmount(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    private update(): void {
        fetch('/api/health')
            .then((res: Response): Promise<IPointsCollection> => {
                if (!res.ok) {
                    throw new Error('Unable to get statistics from API!');
                }
                return res.json();
            }).then((health: IPointsCollection): void => {
                for (const key of Object.keys(health)) {
                    this.graphs[key].update(health[key]);
                }
            }).catch((err: Error): void => console.error(err));
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Head>
                    <title>ADMIN | Statistics</title>
                </Head>
                <main className={styles.main}>
                    {healthWebsites.map((healthWebsite: IHealthWebsite, i: number) => (
                        <div
                            key={i}
                            className={styles.graph}
                        >
                            <Graph
                                ref={(node: Graph) => this.graphs[healthWebsite.url] = node}
                                type={Type.BAR}
                                title={healthWebsite.title}
                                yAxeLabel=""
                                suggestedMin={0}
                                suggestedMax={500}
                                color={Color[Object.keys(Color)[i]]}
                            ></Graph>
                        </div>
                    ))}
                </main>
            </React.Fragment>
        );
    }
}
