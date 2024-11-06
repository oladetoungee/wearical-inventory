import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';


export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip middleware for auth pages
  if (pathname === '/sign-in' || pathname === '/sign-up' || pathname.startsWith('/reset')
  ) {
    return NextResponse.next();
  }

  // Get the token from cookies
  const userAuthToken = req.cookies.get('token')?.value;
console.log('token', userAuthToken)


  try {
      // Redirect if token is missing or invalid
  if (!userAuthToken) {
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  console.log('token')
  } catch (error) {
    console.error("Middleware token verification error:", error);
    return NextResponse.redirect(new URL('/sign-in', req.url));
  }

  // Allow access if the token is valid
  return NextResponse.next();
}


export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}