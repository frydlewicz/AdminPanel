export default class Queue<T> {
    private readonly maxSize: number;
    private readonly loop: boolean;
    private readonly data: T[];

    private size!: number;
    private toProduce!: number;
    private toConsume!: number;

    constructor(maxSize: number, loop: boolean = false) {
        if (!Number.isInteger(maxSize) || maxSize < 1) {
            throw new Error('Invalid parameter');
        }

        this.maxSize = maxSize;
        this.loop = loop;
        this.data = new Array(maxSize);
        this.clear();
    }

    public push(value: T): void {
        if (this.size >= this.maxSize) {
            if (!this.loop) {
                throw new Error('Queue overflow');
            }
            this.pop();
        }

        this.data[this.toProduce] = value;
        if (++this.toProduce >= this.maxSize) {
            this.toProduce = 0;
        }
        ++this.size;
    }

    public pop(): T {
        if (this.size <= 0) {
            throw new Error('Queue empty');
        }

        const value: T = this.data[this.toConsume];
        if (++this.toConsume >= this.maxSize) {
            this.toConsume = 0;
        }
        --this.size;

        return value;
    }

    public top(): T | undefined {
        if (this.size <= 0) {
            return undefined;
        }
        return this.data[this.toConsume];
    }

    public getSize(): number {
        return this.size;
    }

    public isEmpty(): boolean {
        return this.size <= 0;
    }

    public clear(): void {
        this.size = this.toProduce = this.toConsume = 0;
    }

    public [Symbol.iterator](): Iterator<T> {
        const maxSize = this.maxSize;
        const data = this.data;

        let size = this.size;
        let toConsume = this.toConsume;

        return {
            next(): IteratorResult<T> {
                if (size <= 0) {
                    return {
                        done: true,
                        value: null,
                    };
                }

                const value: T = data[toConsume];
                if (++toConsume >= maxSize) {
                    toConsume = 0;
                }
                --size;

                return {
                    done: false,
                    value,
                };
            }
        };
    }
}
