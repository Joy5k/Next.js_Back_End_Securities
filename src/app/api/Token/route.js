import { NextResponse } from "next/server"
import { SignJWT,jwtVerify } from "jose"

export async function POST(req, res) {
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const payload = { email: 'mmehedihasanjoyve@gmail.com', user_id: 'Abc123' }
    
    const Token = await new SignJWT(payload)
        .setProtectedHeader({ alg:'HS256'})
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setExpirationTime('24h')
        .sign(key)
    const reqHeaders = req.headers;
    const setHeaders = await reqHeaders.set('Token', Token)
    return NextResponse.json({Token:Token})
}
export async function GET(req, res) {
    const JSONBody =await req.json();
    const Token = JSONBody['token']
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const decoded = await jwtVerify(Token, key)
    return NextResponse.json(decoded)
    
}