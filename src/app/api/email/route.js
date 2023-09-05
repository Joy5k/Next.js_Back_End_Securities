import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(req, res, next) { 
    const { searchParams } = new URL(req.url);
    let ToEmail = searchParams.get('email')
    const reqHeaders = req.headers
    // const Token = reqHeaders.get('Token') || null;
    const Token=req.cookies.get('Token')||null;
    console.log( 'from backend', Token.value,'from api/email');
const transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: {
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaC[Qs",
    },
    tls:{rejectUnauthorized:false}
});
    let myEmail = {
        from: 'Test email from nextJS application <info@teamrabbil.com>',
        to:ToEmail,
        subject: " nextJS application.The Email sending by Joy",
        text:`Test email from nextJS application.Your verification token is :- ${Token.value} . `
    }
    try {
     const result=   await  transporter.sendMail(myEmail)
      return  NextResponse.json({message:'Success',details:result})
    } catch (e) {
        return  NextResponse.json({message:'Email sending Fail',})

    }

}