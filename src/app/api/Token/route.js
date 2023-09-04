import { NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"
import {headers} from 'next/headers'
import { serialize, parse } from 'cookie';

export async function POST(req, res) {
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const getEmail = req.headers;
    const email=getEmail.get('email');
    const payload = { email:email, user_id: 'Abc123' }
    const Token = await new SignJWT(payload)
        .setProtectedHeader({ alg:'HS256'})
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setExpirationTime('30d')
        .sign(key)
    const reqHeaders = req.headers;
    const setHeaders = await reqHeaders.set('Token', Token)

    console.log(Token,'----------Created the token-----------');
    return NextResponse.json({ Token: Token });
}
export async function GET(req, res) {
    const JSONBody =await req.json();
    const Token = JSONBody['token']
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const decoded = await jwtVerify(Token, key)
    return NextResponse.json(decoded)
    
}