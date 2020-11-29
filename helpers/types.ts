import Queue from './queue';

export interface IObject {
    [key: string]: any;
}

export interface ICollection<T> {
    [key: string]: T;
}

export interface IPoint {
    x: string;
    y: number;
}

export interface IStatsKind {
    name: string;
    title: string;
    yAxeLabel: string;
    suggestedMin: number;
    suggestedMax: number;
}

export interface IHealthWebsite {
    url: string;
    title: string;
}

export type IQueueCollection = ICollection<Queue<IPoint>>;
export type IPointsCollection = ICollection<IPoint[]>;

export type Resolver<T> = (data: T) => void;
export type Rejecter = (err: Error) => void;
export type Getter = () => Promise<number>;
