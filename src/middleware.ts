import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function decodeJwt(token: string) {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    
    // Base64URL decode
    const payloadBase64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(payloadBase64);
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Check if it's an admin dashboard route
  const isAdminDashboard = path.startsWith('/admin/dashboard');
  const isAdminLogin = path === '/admin/login';
  
  if (isAdminDashboard || isAdminLogin) {
    const adminToken = request.cookies.get('admin_token')?.value;
    let isValid = false;
    
    if (adminToken) {
      const payload = decodeJwt(adminToken);
      if (payload && payload.role === 'admin') {
        const isExpired = payload.exp ? Date.now() >= payload.exp * 1000 : false;
        if (!isExpired) {
          isValid = true;
        }
      }
    }
    
    // Redirect unauthenticated requests to login page
    if (isAdminDashboard && !isValid) {
      const loginUrl = new URL('/admin/login', request.url);
      // Optional: keep track of original path
      loginUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(loginUrl);
    }
    
    // Redirect authenticated requests away from login page to dashboard
    if (isAdminLogin && isValid) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
  }
  
  return NextResponse.next();
}

// Config to specify matching routes
export const config = {
  matcher: ['/admin/:path*'],
};
