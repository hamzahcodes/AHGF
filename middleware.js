import { NextResponse } from 'next/server'
 
export function middleware(request) {
  const path = request.nextUrl.pathname

  // console.log(request.url);
  const isPublicPath = (path === '/register' || path === '/')
  
  const token = request.cookies.get("token")?.value || ''
  
  // console.log("Path: ", path);
    // console.log("Token: ",token.length);
    // console.log("Is Public Path: " ,isPublicPath);
  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/customers', request.nextUrl))
  }

  if(!isPublicPath && token.length === 0) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  }

}
 
export const config = {
  matcher: [
    '/',
    '/customers',
    '/customers/:path*',
    '/register'
  ],
}