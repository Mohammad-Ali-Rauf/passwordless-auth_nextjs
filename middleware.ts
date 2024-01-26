import { NextRequest, NextResponse } from 'next/server';
import * as jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function middleware(req: NextRequest) {
	const searchParams = new URLSearchParams(req.nextUrl.search);
	const token = searchParams.get('token');

	if (!token) {
		return NextResponse.json({ error: 'Token is missing' }, { status: 400 });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET!);
		const cookie = cookies();
		cookie.set('token', token, {
			httpOnly: true,
		});
		return decoded;
	} catch (error) {
		return NextResponse.redirect(new URL('/login', req.url))
	}
}

export const config = {
	matcher: '/dashboard/:path*',
};
