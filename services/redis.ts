import redis from 'redis';

import { IObject, Resolver, Rejecter } from '../helpers/types';

const client = redis.createClient();

export function getData(key: string): Promise<IObject> {
    return new Promise((res: Resolver<IObject>, rej: Rejecter): void => {
        client.get(key, (err: Error, val: string): void => {
            if (err) {
                return rej(err);
            }
            if (!val) {
                return res({});
            }

            try {
                res(JSON.parse(val));
            } catch (err) {
                rej(err);
            }
        });
    });
}

export function setData(key: string, data: IObject): void {
    if (data) {
        client.set(key, JSON.stringify(data));
    }
}

client.on('error', (err: Error): void => {
    console.error('Redis client unexpected error!', err);
});
