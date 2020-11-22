import { NextApiResponse } from 'next';

import { IStats } from '../../helpers/types';
import { getData } from '../../services/redis';

export default function handler(_, res: NextApiResponse): void {
    getData('admin-panel_stats')
        .then((stats: IStats): void => {
            res.json(stats);
        }).catch((): void => {
            res.status(500);
        });
}
