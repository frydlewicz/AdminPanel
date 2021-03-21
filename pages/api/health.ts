import { NextPageContext, NextApiResponse } from 'next';

import { IPointsCollection } from '../../helpers/types';
import { authMiddleware } from '../../services/auth';
import { getData } from '../../services/redis';

export function getServerSideProps(ctx: NextPageContext) {
    return authMiddleware(ctx);
}

export default function handler(_, res: NextApiResponse): void {
    getData('admin-panel_health')
        .then((health: IPointsCollection): void => {
            res.json(health);
        }).catch((err: Error): void => {
            console.error('API health handler error!', err);
            res.status(500);
        });
}
