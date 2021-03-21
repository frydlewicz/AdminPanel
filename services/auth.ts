import { NextPageContext } from 'next';
import basicAuthMiddleware from 'nextjs-basic-auth-middleware';

export async function authMiddleware(ctx: NextPageContext) {
    await basicAuthMiddleware(ctx.req, ctx.res, {
        users: [
            {
                name: 'admin',
                password: 'admin',
            },
        ],
    });

    return {};
}
