import { IStatsKind, IStats } from '../helpers/types';
import { statsKinds } from '../config.json';

export function getStats(): IStats {
    const result: IStats = {};

    statsKinds.forEach((statsKind: IStatsKind): void => {
        result[statsKind.name] = [];

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
            result[statsKind.name].push({
                x,
                y: Math.random(),
            });
        });
    });

    return result;
}
