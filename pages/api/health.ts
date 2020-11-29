import { NextApiResponse } from 'next';

import { IPointsCollection } from '../../helpers/types';
import { getData } from '../../services/redis';

export default function handler(_, res: NextApiResponse): void {
    getData('admin-panel_health')
        .then((health: IPointsCollection): void => {
            res.json(health);
        }).catch((): void => {
            res.status(500);
        });
}
