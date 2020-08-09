import React from 'react';

declare const Chart;

function genConfig({ title, xAxeLabel, yAxeLabel, color }: Props) {
    return {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                backgroundColor: color,
                borderColor: color,
                data: [],
                fill: false,
                pointRadius: 8,
            }],
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: title,
            },
            legend: {
                display: false,
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: xAxeLabel,
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yAxeLabel,
                    }
                }]
            }
        }
    };
}

interface Props {
    title: string;
    xAxeLabel: string;
    yAxeLabel: string;
    color: Color;
}

export interface Point {
    x: string;
    y: number;
}

export enum Color {
    RED = '#F44336',
    BLUE = '#03A9F4',
    GREEN = '#4CAF50',
    ORANGE = '#FFA000',
    VIOLET = '#9575CD',
    BROWN = '#8D6E63',
}

export default class Graph extends React.Component<Props> {
    private readonly config;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private chart: typeof Chart;
    private ready: boolean = false;
    private points: Point[] = null;

    constructor(props: Props) {
        super(props);

        this.config = genConfig(props);
    }

    public componentDidMount(): void {
        this.ctx = this.canvas.getContext('2d');

        this.createChartScript()
            .then((): void => this.createChartObject());
    }

    private createChartScript(): Promise<void> {
        if (typeof Chart !== 'undefined') {
            return Promise.resolve();
        }

        return new Promise((res: () => void): void => {
            const script = document.createElement('script');

            script.onload = (): void => res();
            script.src = '/chart.min.js';

            document.body.appendChild(script);
        });
    }

    private createChartObject(): void {
        this.chart = new Chart(this.ctx, this.config);
        this.ready = true;

        if (this.points) {
            this.update(this.points);
        }
    }

    public update(points: Point[]): void {
        if (!this.ready) {
            this.points = points;
            return;
        }
        const xValues = points.map((point: Point): string => point.x);
        const yValues = points.map((point: Point): number => point.y);

        this.config.data.labels = xValues;
        this.config.data.datasets[0].data = yValues;

        this.chart.update();
    }

    public render(): React.ReactNode {
        return (
            <canvas
                ref={(node: HTMLCanvasElement) => this.canvas = node}
            ></canvas>
        );
    }
}
