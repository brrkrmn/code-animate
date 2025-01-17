import NextAuth from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import authConfig from "./auth.config";

export const { auth: nextAuthMiddleware } = NextAuth(authConfig);

export async function middleware(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response = await nextAuthMiddleware(req);
  if (!response) return NextResponse.next();

  const pathname = req.nextUrl.pathname;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (response as any as NextResponse).headers.set("x-pathname", pathname);

  return response || NextResponse.next();
}
