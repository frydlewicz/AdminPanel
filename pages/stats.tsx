import React from 'react';
import Head from 'next/head';

import config from '../config.json';
import { ICollection, IStatsKind, IPointsCollection } from '../helpers/types';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import Graph, { Type, Color } from '../components/graph';

import styles from '../styles/graph.module.less';

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
            .then((res: Response): Promise<IPointsCollection> => {
                if (!res.ok) {
                    throw new Error('Unable to get statistics from API!');
                }
                return res.json();
            }).then((stats: IPointsCollection): void => {
                for (const key of Object.keys(stats)) {
                    this.graphs[key].update(stats[key]);
                }
            }).catch((err: Error): void => console.error(err));
    }

    public render(): React.ReactNode {
        return (
            <div>
                <Navbar />
                <Head children={[<title>ADMIN | Statistics</title>]} />
                <main className={styles.main}>
                    {config.statsKinds.map((statsKind: IStatsKind, i: number) => (
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
                                stepSize={statsKind.stepSize}
                                color={Color[Object.keys(Color)[i]]}
                            ></Graph>
                        </div>
                    ))}
                </main>
                <Footer />
            </div>
        );
    }
}
