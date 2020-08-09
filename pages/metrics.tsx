import React from 'react';
import Head from 'next/head';

import { metrics } from '../config.json';
import { IColector, getData } from '../services/redis';
import Graph, { Color } from '../components/graph';

export interface IMetric {
    name: string;
    title: string;
    yAxeLabel: string;
}

export default class Metrics extends React.Component {
    private readonly graphs: IColector<Graph> = {};

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
        const data = getData();

        for (const key of Object.keys(data)) {
            this.graphs[key].update(data[key]);
        }
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Head>
                    <title>ADMIN | Metrics</title>
                </Head>
                <main>
                    {metrics.map((metric: IMetric, i: number) => (
                        <Graph
                            key={i}
                            ref={(node: Graph) => this.graphs[metric.name] = node}
                            title={metric.title}
                            xAxeLabel=""
                            yAxeLabel={metric.yAxeLabel}
                            color={Color[Object.keys(Color)[i]]}
                        ></Graph>
                    ))}
                </main>
            </React.Fragment>
        );
    }
}
