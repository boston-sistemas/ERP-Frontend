import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/utils/session';


export function middleware(request: NextRequest) {
    const token = request.cookies.get('access_token');
    if (!token) {
        console.log('no pase')
        return NextResponse.redirect(new URL('/login', request.url));
    }
    console.log('pase')
    return NextResponse.next();
  }
  