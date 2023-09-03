import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function POST(req, res, next) { 
    const { searchParams } = new URL(req.url);
    let ToEmail = searchParams.get('email')
    const reqHeaders = req.headers
    const Token = reqHeaders.get('Token') || null;
    console.log( 'from backend', Token);
const Transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaC[Qs",
    },
    tls:{rejectUnauthorized:false}
});
    let myEmail = {
        form: 'Test email from nextJS application <info@teamrabbil.com>',
        to:ToEmail,
        subject: "Test email from nextJS application.Joy",
        text:`Test email from nextJS application.Your verification token ${Token} . `
    }
    try {
        await  Transporter.sendMail(myEmail)
      return  NextResponse.json({message:'Success'})
    } catch (e) {
        return  NextResponse.json({message:'Fail',})

    }

}