import { statsPoints, statsInterval, statsKinds, healthPoints, healthInterval, healthWebsites } from './config.json';
import { IQueueCollection, IPointsCollection } from './helpers/types';
import { formatTime, formatNumber } from './helpers/format';
import Queue from './helpers/queue';
import { setData } from './services/redis';
import { getters } from './services/system';
import { fetchAndGetStatus } from './services/status';

const statsQueues: IQueueCollection = {};
const stats: IPointsCollection = {};

const healthQueues: IQueueCollection = {};
const health: IPointsCollection = {};

function init(): void {
    statsKinds.forEach((statsKind): void => {
        const name = statsKind.name;

        statsQueues[name] = new Queue(statsPoints, true);
        stats[name] = [];
    });

    healthWebsites.forEach((healthWebsite): void => {
        const url = healthWebsite.url;

        healthQueues[url] = new Queue(healthPoints, true);
        health[url] = [];
    });
}

function calcStats(): void {
    statsKinds.forEach((statsKind): void => {
        const name = statsKind.name;

        getters[name]().then((result): void => {
            const date = new Date();
            const x = formatTime(date);
            const y = formatNumber(result);

            statsQueues[name].push({ x, y });
            stats[name] = [...statsQueues[name]];

            setData('admin-panel_stats', stats);
        });
    });
}

function calcHealth(): void {
    healthWebsites.forEach((healthWebsite): void => {
        const url = healthWebsite.url;

        fetchAndGetStatus(url).then((y) => {
            const date = new Date();
            const x = formatTime(date);

            healthQueues[url].push({ x, y });
            health[url] = [...healthQueues[url]];

            setData('admin-panel_health', health);
        });
    });
}

init();
calcStats();
calcHealth();

setInterval((): void => calcStats(), statsInterval);
setInterval((): void => calcHealth(), healthInterval);

process.stdin.resume();

export { };
