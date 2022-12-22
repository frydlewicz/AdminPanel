import sha256 from 'crypto-js/sha256';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import conf from './config.json';

function getCredentials(authorization: string): [string, string] {
    if (!authorization || !authorization.startsWith('Basic ')) {
        throw new Error('Missing authorization header!');
    }

    const coded = authorization.split(' ')[1];
    const decoded = globalThis.atob(coded);
    const [login, password] = decoded.split(':');

    return [login, password];
}

function checkCredentials(login: string, password: string): void {
    const user = conf.users.find((temp) => temp.login === login);

    if (!user) {
        throw new Error(`User "${login}" not found!`);
    }

    const hash = sha256(password + user.salt).toString();

    if (hash !== user.password) {
        throw new Error(`Incorrect password for user "${login}"!`);
    }
}

export function middleware(request: NextRequest): NextResponse {
    if (!conf.users || conf.users.length === 0) {
        return NextResponse.next();
    }

    try {
        const [login, password] = getCredentials(request.headers.get('authorization'));

        checkCredentials(login, password);
        NextResponse.next();
    } catch (err) {
        console.warn(err.toString(), request.ip);

        return new NextResponse(undefined, {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Admin Panel"',
            }
        });
    }
}

export const config = {
    matcher: '/((?!favicon.ico).*)',
}
