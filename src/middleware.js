
import { NextResponse } from "next/server"
import { SignJWT, jwtVerify } from "jose"

export async function middleware(req, res, next) {

  //setting the user's secrete token in headers
  if (req.nextUrl.pathname.startsWith('/api/Token')) {
    const key = new TextEncoder().encode(process.env.JWT_SECRET)
    const getEmail = req.headers;
    const email=getEmail.get('email');
    const payload = { email:email, user_id: 'Abc123' }
    const token = await new SignJWT(payload)
        .setProtectedHeader({ alg:'HS256'})
        .setIssuedAt()
        .setIssuer('http://localhost:3000')
        .setExpirationTime('30d')
        .sign(key)
    const reqHeaders = req.headers;
    const setHeaders = await reqHeaders.set('Token', token)
    console.log('going to create token');
return NextResponse.next()
  }

//checking the user email and manage to send email to the user
  if (req.nextUrl.pathname.startsWith('/api/email')) {
    console.log('going to sending email');
return NextResponse.next()
  }

  //verifying user token and checking the valid user
    if (req.nextUrl.pathname.startsWith('/api/Profile')) {
    
        try {
            console.log('middleware trying to access /api/Profile');
            const requestHeaders = new Headers(req.headers);
          const Token=requestHeaders.get('Token');
            const key = new TextEncoder().encode(process.env.JWT_SECRET)
            console.log('middleware 2nd',Token);
          const decoded = await jwtVerify(Token, key)
          console.log(decoded,'------------the user------------');
           return NextResponse.next()
        } catch (error) {

         return NextResponse.json({status:'fail',message:'Invalid User',error:error})
        
        }

    }
  
  return  NextResponse.next();
}