export function formatTime(date: Date): string {
    return `${date.getHours() < 10
        ? '0' + date.getHours()
        : date.getHours()
        }:${date.getMinutes() < 10
            ? '0' + date.getMinutes()
            : date.getMinutes()
        }`;
}

export function formatNumber(value: number): number {
    return Math.round(100 * value) / 100;
}
