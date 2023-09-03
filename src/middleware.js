
import { NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"

export async function middleware(req, res, next) {
  if (req.nextUrl.pathname.startsWith('/api/Token')) {
    // const key = new TextEncoder().encode(process.env.JWT_SECRET)
    // const payload = { email: 'mmehedihasanjoyve@gmail.com', user_id: 'Abc123' }
    // const token = await new SignJWT(payload)
    //     .setProtectedHeader({ alg:'HS256'})
    //     .setIssuedAt()
    //     .setIssuer('http://localhost:3000')
    //     .setExpirationTime('24h')
    //     .sign(key)
    // const reqHeaders = req.headers;
    // const setHeaders = await reqHeaders.set('Token', token)
    console.log('going to create token');
return NextResponse.next()
  }
  if (req.nextUrl.pathname.startsWith('/api/email')) {
    console.log('going to sending email');
return NextResponse.next()
  }
    if (req.nextUrl.pathname.startsWith('/api/Profile')) {
    
        try {
            console.log('middleware');
            const requestHeaders = new Headers(req.headers);
            const Token = requestHeaders.get('Token')
            const key = new TextEncoder().encode(process.env.JWT_SECRET)
            console.log('middleware 2nd',Token);
            const decoded = await jwtVerify(Token, key)
           return NextResponse.next()
        } catch (error) {

         return NextResponse.json({status:'fail',message:'Invalid User'})
        
        }

    }
  
  return  NextResponse.next();
}