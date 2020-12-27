import React from 'react';

import { IPoint } from '../helpers/types';

declare const Chart;

function genConfig({ type, title, yAxeLabel, suggestedMin, suggestedMax, stepSize, color }: IProps) {
    return {
        type,
        data: {
            labels: [],
            datasets: [{
                backgroundColor:
                    (typeof color === 'object')
                        ? color.map((color: Color): string => color + '80')
                        : color,
                borderColor: color,
                borderWidth: 1,
                data: [],
                fill: false,
                pointRadius: 4,
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
                        display: false,
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: yAxeLabel,
                    },
                    ticks: {
                        stepSize,
                        suggestedMin,
                        suggestedMax,
                    }
                }]
            }
        },
    };
}

interface IProps {
    type: Type,
    title: string;
    yAxeLabel: string;
    suggestedMin: number;
    suggestedMax: number;
    stepSize?: number;
    color: Color | Color[];
}

export enum Type {
    LINE = 'line',
    BAR = 'bar',
}

export enum Color {
    RED = '#EF5350',
    BLUE = '#03A9F4',
    GREEN = '#4CAF50',
    ORANGE = '#FFA000',
    VIOLET = '#9575CD',
    BROWN = '#8D6E63',
}

export default class Graph extends React.Component<IProps> {
    private readonly config;

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private chart: typeof Chart;
    private ready: boolean = false;
    private points: IPoint[] = null;

    constructor(props: IProps) {
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

    public update(points: IPoint[], color?: Color | Color[]): void {
        this.points = points;

        const xValues = points.map((point: IPoint): string => point.x);
        const yValues = points.map((point: IPoint): number => point.y);

        this.config.data.labels = xValues;
        this.config.data.datasets[0].data = yValues;

        if (color) {
            this.config.data.datasets[0].backgroundColor =
                (typeof color === 'object')
                    ? color.map((color: Color): string => color + '80')
                    : color;
            this.config.data.datasets[0].borderColor = color;
        }

        if (this.ready) {
            this.chart.update();
        }
    }

    public render(): React.ReactNode {
        return (
            <canvas
                ref={(node: HTMLCanvasElement) => this.canvas = node}
            ></canvas>
        );
    }
}
