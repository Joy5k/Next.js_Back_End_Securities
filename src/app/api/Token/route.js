import { NextResponse } from "next/server"
import { SignJWT,jwtVerify } from "jose"

export async function POST(req, res) {

    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const jsonBody = req.json()
    
    const payload = { email: 'mmehedihasanjoyve@gmail.com', user_id: 'Abc123' }
    
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg:'HS256'})
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setExpirationTime('2h')
        .sign(key)
    
    return NextResponse.json({token:token})
}
export async function GET(req, res) {
    const JSONBody =await req.json();
    const Token = JSONBody['token']
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const decoded = await jwtVerify(Token, key)
    return NextResponse.json(decoded)
    
}