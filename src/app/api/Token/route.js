import { NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import {headers} from 'next/headers'
import { serialize, parse } from 'cookie';

export async function POST(req, res) {
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const getEmail = req.headers;
    const email=getEmail.get('email');
    console.log(email,'user Email');
    const payload = { email:email, user_id: 'Abc123' }
    const Token = await new SignJWT(payload)
        .setProtectedHeader({ alg:'HS256'})
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setExpirationTime('30d')
        .sign(key)
    const reqHeaders = req.headers;
    const setHeaders = await reqHeaders.set('Token', Token)
    // const setCookies=req.cookies.set('Token', Token)
    return NextResponse.json({ Token: Token });
}
export async function GET(req, res) {
    const JSONBody =await req.json();
    const Token = JSONBody['Token']
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const decoded = await jwtVerify(Token, key)
    return NextResponse.json(decoded)
    
}
export async function VerifyToken(Token) {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const decoded = await jwtVerify(Token, secret)
    return decoded['payload']
    
}