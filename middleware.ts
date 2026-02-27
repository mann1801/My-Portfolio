import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const adminToken = request.cookies.get('admin_token')?.value;
    const isAuthRoute = request.nextUrl.pathname.startsWith('/admin/login');
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

    // If trying to access admin dashboard without token, redirect to login
    if (isAdminRoute && !isAuthRoute && !adminToken) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // If trying to access login page with a token, redirect to dashboard
    if (isAuthRoute && adminToken) {
        return NextResponse.redirect(new URL('/admin', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
