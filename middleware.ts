import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
	const { pathname } = req.nextUrl;

	if (pathname === '/verify') {
		const searchParams = new URLSearchParams(req.nextUrl.search);
		const token = searchParams.get('token');

		if (!token) {
			return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
		}

		try {
			const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
			await jwtVerify(token, secret, { algorithms: ['HS256'] });

			return NextResponse.redirect(new URL('/dashboard', req.url));
		} catch (error) {
			console.error(error);

			return NextResponse.redirect(new URL('/', req.url));
		}
	}

	if (pathname === '/dashboard') {
		const tokenFromCookie = cookies().get('token');

		if (!tokenFromCookie) {
			return NextResponse.redirect(new URL('/', req.url));
		}
		return NextResponse.next();
	}
}

export const config = {
	matcher: ['/dashboard/:path*', '/verify/:path*'],
};
