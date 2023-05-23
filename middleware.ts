import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
    const origin = req.headers.get('origin') ?? ""
    const resp = NextResponse.next()
    resp.headers.set("Access-Control-Allow-Origin", /^https:\/\/(fruits-navy.vercel.app)\/$/i.test(origin) ? origin : "")
    resp.headers.set("Access-Control-Allow-Methods", "GET, POST")
    resp.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")
    resp.headers.set("Access-Control-Allow-Max-Age", "86400")
    return resp
}

export const config = {
    matcher: '/api/:path*',
}