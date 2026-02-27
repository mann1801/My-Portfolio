import { NextResponse } from 'next/server';

export async function POST() {
    // Create a response object that redirects to the homepage or login
    const response = NextResponse.json({ success: true, message: 'Logged out successfully' });

    // Clear the admin token cookie by setting its expiration to the past
    response.cookies.set({
        name: 'admin_token',
        value: '',
        expires: new Date(0),
        path: '/',
    });

    return response;
}
