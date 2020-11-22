import { statsPoints, statsInterval, statsKinds } from './config.json';
import { IStatsKind, IStatsQueues, IStats } from './helpers/types';
import { formatTime, formatNumber } from './helpers/format';
import Queue from './helpers/queue';
import { setData } from './services/redis';
import { getters } from './services/system';

const statsQueues: IStatsQueues = {};
const stats: IStats = {};

function initStats(): void {
    statsKinds.forEach((statsKind): void => {
        const name = statsKind.name;

        statsQueues[name] = new Queue(statsPoints, true);
        stats[name] = [];
    });
}

function calcStats(): void {
    statsKinds.forEach((statsKind: IStatsKind): void => {
        const name = statsKind.name;

        getters[name]().then((result): void => {
            const date = new Date();
            const x = formatTime(date);
            const y = formatNumber(result);

            statsQueues[name].push({ x, y });
            stats[name] = [...statsQueues[name]];

            setData('admin-panel_stats', stats);
        })
    });
}

initStats();
calcStats();

setInterval((): void => calcStats(), statsInterval);

process.stdin.resume();

export { };
