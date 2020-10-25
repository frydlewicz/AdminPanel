import { NextApiResponse } from 'next';

import { getStats } from '../../services/redis';

export default function handler(_, res: NextApiResponse): void {
    const stats = getStats();

    res.json(stats);
}
