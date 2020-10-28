import { IStatsKind, IStats } from './helpers/types';
import { statsKinds } from './config.json';
import { setData } from './services/redis';

function abc(): void {
    const data: IStats = {};

    statsKinds.forEach((statsKind: IStatsKind): void => {
        data[statsKind.name] = [];

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
            data[statsKind.name].push({
                x,
                y: Math.random(),
            });
        });
    });

    setData('admin-panel_stats', data);
}

setInterval((): void => {
    abc();
}, 1500);

process.stdin.resume();

export { };
