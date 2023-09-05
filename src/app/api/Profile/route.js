import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function VerifyToken() { 
    const headerList = headers();
    const email = headerList.get('userInfo');
    const requestHeaders = new Headers(req.headers);
          const Token = requestHeaders.get('Token');
    // console.log(headerList);
return NextResponse.json({message:'Success',email,Token})
}