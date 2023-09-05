import { NextResponse } from "next/server"
import { SignJWT,jwtVerify } from "jose"

export async function POST(req, res) {
    const jsonBody = await req.json();
    const userName = jsonBody['user']
    const password = jsonBody['password']
    if (userName === 'joy' && password === '123') {

        const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const payload = {userName: userName}
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg:'HS256'})
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setExpirationTime('2h')
        .sign(key)
    return NextResponse.json({status:true,message:'login successful',token:token})
    }
    else {
        return NextResponse.json({status:'fail',message:'login fail'})

    }
}