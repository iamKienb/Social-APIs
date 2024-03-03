import { Response } from 'express';
import nodemailer from 'nodemailer'
export const sendEmail = async (
    email:string,
    title:string,
    content:string
) =>{
    const transporter = await  nodemailer.createTransport({
        service:  "gmail",
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth:{
            user: "deadpipopi@gmail.com",
            pass: "0123456789az"
        },
    })
    
    const mailOptions = {
        from : "test.2002@gmail.com",
        to:email,
        subject: 'Invoices due',
        text: title,
        html: `<h1 style= "color:blue"> ${title}</h1> ${content}`

    };
    transporter.sendMail(mailOptions, (err:any, info:any) =>{
        if(err){
            console.log(err)
        }else{
            console.log("email sent: " + info.response)
        }
    })
}