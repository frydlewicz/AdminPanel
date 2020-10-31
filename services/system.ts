import os from 'os-utils';
import si from 'systeminformation';

import { Resolver } from '../helpers/types';

export function getCPUUsage(): Promise<number> {
    return new Promise((res: Resolver<number>): void => {
        os.cpuUsage((val: number): void => {
            res(100 * val);
        });
    });
}

export function getCPULoad(): number {
    return os.loadavg(5);
}

export function getTemperature(): Promise<number> {
    return si.cpuTemperature()
        .then((data): number => data.main)
}

export function getMemory(): number {
    return os.freememPercentage() * 100;
}
