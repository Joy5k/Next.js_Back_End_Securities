import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer'

export async function GET(req, res, next) { 
    const { searchParams } = new URL(req.url);
    let ToEmail = searchParams.get('email')
console.log(ToEmail,'from backend');
   
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
        to: ToEmail,
        subject: "Test email from nextJS application.Joy",
        text:"Test email from nextJS application.Hello I am Mehedi Hasan Joy"
    }
    try {
        await     Transporter.sendMail(myEmail)
      return  NextResponse.json({message:'Success'})
    } catch (e) {
        return  NextResponse.json({message:'Fail',})

    }

}