import React from 'react';
import Head from 'next/head';

import { healthWebsites } from '../config.json';
import { ICollection, IPoint, IHealthWebsite, IPointsCollection } from '../helpers/types';
import Navbar from '../components/navbar';
import Graph, { Type, Color } from '../components/graph';

import styles from '../styles/health.less';

export default class Health extends React.Component {
    private readonly graphs: ICollection<Graph> = {};
    private interval: NodeJS.Timeout;

    public static getColorByStatus(status: number): Color {
        if (status >= 500) {
            return Color.RED;
        } else if (status >= 400) {
            return Color.ORANGE;
        } else if (status >= 300) {
            return Color.VIOLET;
        } else {
            return Color.GREEN;
        }
    }

    public static getColorsByPoints(points: IPoint[]): Color[] {
        return points.map((point) => Health.getColorByStatus(point.y));
    }

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
                    this.graphs[key].update(health[key], Health.getColorsByPoints(health[key]));
                }
            }).catch((err: Error): void => console.error(err));
    }

    public render(): React.ReactNode {
        return (
            <React.Fragment>
                <Navbar></Navbar>
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
                                color={Color.GREEN}
                            ></Graph>
                        </div>
                    ))}
                </main>
            </React.Fragment>
        );
    }
}
