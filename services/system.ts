import os from 'os-utils';
import si from 'systeminformation';

import { ICollection, Resolver, Getter } from '../helpers/types';

export const getters: ICollection<Getter> = {};

getters.cpu_usage = (): Promise<number> => {
    return new Promise((res: Resolver<number>): void => {
        os.cpuUsage((val: number): void => {
            res(100 * val);
        });
    });
};

getters.cpu_load = (): Promise<number> => {
    return Promise.resolve(os.loadavg(1));
};

getters.temperature = (): Promise<number> => {
    return si.cpuTemperature()
        .then((data): number => data.main)
}

getters.memory = (): Promise<number> => {
    return si.mem()
        .then((data): number => 100 - 100 * data.available / data.total);
};
