import React from 'react';
import Head from 'next/head';

import { metrics } from '../config.json';
import { ICollector, IMetric } from '../helpers/types';
import Graph, { Type, Color } from '../components/graph';

import styles from '../styles/metrics.less';

export default class Metrics extends React.Component {
    private readonly graphs: ICollector<Graph> = {};

    private interval: NodeJS.Timeout;

    public componentDidMount(): void {
        this.update();
        this.interval = setInterval((): void => this.update(), 1000 * 3);
    }

    public componentWillUnmount(): void {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    private update(): void {
        fetch('/api/metrics')
            .then((res: Response): Promise<any> => {
                if (!res.ok) {
                    throw new Error('Unable to get metrics!');
                }
                return res.json();
            }).then((metrics: any): void => {
                for (const key of Object.keys(metrics)) {
                    this.graphs[key].update(metrics[key]);
                }
            }).catch((err: Error): void => console.error(err));
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Head>
                    <title>ADMIN | Metrics</title>
                </Head>
                <main className={styles.main}>
                    {metrics.map((metric: IMetric, i: number) => (
                        <div
                            key={i}
                            className={styles.graph}
                        >
                            <Graph
                                ref={(node: Graph) => this.graphs[metric.name] = node}
                                type={Type.LINE}
                                title={metric.title}
                                yAxeLabel={metric.yAxeLabel}
                                color={Color[Object.keys(Color)[i]]}
                            ></Graph>
                        </div>
                    ))}
                </main>
            </React.Fragment>
        );
    }
}
