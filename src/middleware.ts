import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, type JWTPayload } from 'jose';

const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);

interface CustomJWTPayload extends JWTPayload {
  isVerified?: boolean;
}

async function verifyToken(token: string): Promise<CustomJWTPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as CustomJWTPayload;
  } catch (err) {
    console.error('Middleware JWT verify error:', err);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublic =
    path.startsWith('/login') ||
    path.startsWith('/signup') ||
    path.startsWith('/verifyemail');

  const token = request.cookies.get('token')?.value;

  let decoded = null;

  if (token) {
    decoded = await verifyToken(token);
    console.log("Decoded token:", decoded);

    if (decoded) {
      console.log('Decoded token:', decoded);
    }
  }

  if (isPublic && decoded?.isVerified) {
    return NextResponse.redirect(new URL('/profile', request.url));
  }

  if (!isPublic && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (!isPublic && token) {
    if (!decoded) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (!decoded.isVerified) {
      return NextResponse.redirect(new URL('/verifyemail', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/profile/:path*',
    '/dashboard',
    '/login',
    '/signup',
    '/verifyemail',
  ],
};
