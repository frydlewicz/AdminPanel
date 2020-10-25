export interface IPoint {
    x: string;
    y: number;
}

export interface ICollector<T> {
    [key: string]: T;
}

export interface IMetric {
    name: string;
    title: string;
    yAxeLabel: string;
}