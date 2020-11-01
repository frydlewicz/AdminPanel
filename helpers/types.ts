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
}

export type IStatsQueues = ICollection<Queue<IPoint>>;
export type IStats = ICollection<IPoint[]>;

export type Resolver<T> = (data: T) => void;
export type Rejecter = (err: Error) => void;
export type Getter = () => Promise<number>;
