export interface IPoint {
    x: string;
    y: number;
}

export interface ICollection<T> {
    [key: string]: T;
}

export interface IStatsKind {
    name: string;
    title: string;
    yAxeLabel: string;
}

export type IStats = ICollection<IPoint[]>;
