import React from 'react';
import Head from 'next/head';

import { statsKinds } from '../config.json';
import { ICollection, IStatsKind, IStats } from '../helpers/types';
import Graph, { Type, Color } from '../components/graph';

import styles from '../styles/stats.less';

export default class Stats extends React.Component {
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
        fetch('/api/stats')
            .then((res: Response): Promise<IStats> => {
                if (!res.ok) {
                    throw new Error('Unable to get statistics from API!');
                }
                return res.json();
            }).then((stats: IStats): void => {
                for (const key of Object.keys(stats)) {
                    this.graphs[key].update(stats[key]);
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
                    {statsKinds.map((statsKind: IStatsKind, i: number) => (
                        <div
                            key={i}
                            className={styles.graph}
                        >
                            <Graph
                                ref={(node: Graph) => this.graphs[statsKind.name] = node}
                                type={Type.LINE}
                                title={statsKind.title}
                                yAxeLabel={statsKind.yAxeLabel}
                                suggestedMin={statsKind.suggestedMin}
                                suggestedMax={statsKind.suggestedMax}
                                color={Color[Object.keys(Color)[i]]}
                            ></Graph>
                        </div>
                    ))}
                </main>
            </React.Fragment>
        );
    }
}
