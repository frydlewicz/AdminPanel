import { NextApiResponse } from 'next';

import { getMetrics } from '../../services/redis';

export default function handler(_, res: NextApiResponse) {
    const metrics = getMetrics();

    res.json(metrics);
}
