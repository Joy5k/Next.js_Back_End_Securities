import {VerifyToken} from "@/app/utility/JWTHelper";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";

export async function CheckCookieAuth(req, res) {
  
    try {
        const Token = req.cookies.get('Token')
        const TokenValue= Token['value']
    let payload= await VerifyToken(TokenValue)
    return NextResponse.json({msg:'success'})
} catch (error) {
    NextResponse.json({msg:'Fail to access Protected Route',message:"Unauthorized", error: error},{status:401})
}

        // let token = req.cookies.get('Token');
      
        // const requestHeaders = new Headers(req.headers)
        // requestHeaders.set('email', payload['email'])
        // return NextResponse.next({
        //     request: {headers: requestHeaders},
        // })
    

}
