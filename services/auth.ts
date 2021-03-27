import { NextPageContext } from 'next';
import basicAuthMiddleware from 'nextjs-basic-auth-middleware';

import config from '../config.json';

export async function authMiddleware(ctx: NextPageContext) {
    await basicAuthMiddleware(ctx.req, ctx.res, {
        users: config.users,
    });

    return {};
}
