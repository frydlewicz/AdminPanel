import fetch from 'node-fetch';

export function fetchAndGetStatus(url: string): Promise<number> {
    return fetch(url)
        .then((res): number => res.status);
}
