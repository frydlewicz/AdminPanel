import { metrics } from '../config.json';
import { IPoint, ICollector, IMetric } from '../helpers/types';

export function getMetrics(): ICollector<IPoint[]> {
    const result: ICollector<IPoint[]> = {};

    metrics.forEach((metric: IMetric): void => {
        result[metric.name] = [];

        [
            '11:40',
            '11:50',
            '12:00',
            '12:10',
            '12:20',
            '12:30',
            '12:40',
            '12:50'
        ].forEach((x: string): void => {
            result[metric.name].push({
                x,
                y: Math.random(),
            });
        });
    });

    return result;
}
