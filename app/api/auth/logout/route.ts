import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { signOut } from '@/auth';

export async function POST() {
    const cookieStore = cookies();
    
    // Supprime les cookies de session
    cookieStore.delete('authjs.csrf-token');
    cookieStore.delete('authjs.session-token');

    await signOut({ redirectTo: '/auth' });

    return NextResponse.redirect(new URL('/auth', process.env.NEXT_PUBLIC_URL || ''));
}
