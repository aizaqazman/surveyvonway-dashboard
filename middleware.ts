// import { NextRequest, NextResponse } from "next/server";

// export async function middleware(request: NextRequest) {

//     const { pathname } = request.nextUrl;

//     if (pathname === '/login' || pathname.startsWith('/_next')) {
//         return NextResponse.next();
//     }

//     const session = request.cookies.get('client-session');

//     if(!session){
//         return NextResponse.redirect(new URL("/login",  request.url));
//     }

//     return NextResponse.next();
// }

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/dashboard(.*)', 'admin'])

// const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)){ await auth.protect()
    
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
