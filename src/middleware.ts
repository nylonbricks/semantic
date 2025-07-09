import { NextRequest, NextResponse } from 'next/server';

export const middleware = (request: NextRequest) => {
  const pathname: string = request.nextUrl.pathname;
  if (pathname.startsWith('/content')) {
    const _pathname: string = pathname.replace('/content', '');
    return NextResponse.rewrite(new URL(`/api/static${_pathname}`, request.url));
  }
  return NextResponse.next();
};

export default middleware;

export const config = { matcher: '/content/:path*' };
