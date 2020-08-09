import { metrics } from '../config.json';
import { IMetric } from '../pages/metrics';
import { IPoint } from '../components/graph';

export interface IColector<T> {
    [key: string]: T;
}

export function getData(): IColector<IPoint[]> {
    const result: IColector<IPoint[]> = {};

    metrics.forEach((metric: IMetric): void => {
        result[metric.name] = [];

        [
            '11:50',
            '12:00',
            '12:10',
            '12:20',
            '12:30'
        ].forEach((x: string): void => {
            result[metric.name].push({
                x,
                y: Math.random(),
            });
        });
    });

    return result;
}
