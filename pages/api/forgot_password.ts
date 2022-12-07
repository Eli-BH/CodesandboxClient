import type { NextApiRequest, NextApiResponse } from "next";

import dbConnect from "../../utils/connectMongo";
import Patient from "../../models/PatientModel";
import Caregiver from "../../models/CaregiverModel";
import sendgrid from '@sendgrid/mail'




sendgrid.setApiKey(process.env.SENDGRID_KEY as string)




export default async function forgotPassword(
    req: NextApiRequest,
    res: NextApiResponse
) {

    dbConnect()
    const { email } = req.body;
    try {
        //check if the email is in our sys

        const user = await Caregiver.findOne({ email }) || await Patient.findOne({ email })

        //if usr not in db, return false status 
        if (!user) return res.status(404).json({ success: false, message: 'User not found' })


        //If user is in db, create email
        const resetToken = user.getResetPasswordToken();

        await user.save()


        //create a reset url 
        const resetUrl = `http://mysteps.freedomcare.com/reset_password/${resetToken}`


        try {
            await sendgrid.send({
                from: "ebhenderson@freedomcareny.com",
                to: `${email}`,
                subject: `Reset Password`,
                html: `<!DOCTYPE html>
                <html lang="en" style="background-color: #6a81ac;">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <style>
                    *{
                        padding: 0;
                        margin: 0;
                    }
                </style>
                <body style="height: 100vh; width: 100vw; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                   
                    <div class="mainContent" style=" width: 80%; height: 80%; padding: 10px; display: flex; flex-direction: column; justify-content: space-evenly; align-items: center; border-radius: 8px; background-color: #fff;">
                       
                        <div>
                            <h2 class="greeting-user" style="text-align: center; margin: 0 0 1em 0;">Hello ${user.firstName}! Forgot your password?</h2>
                            <h3 class="fyp" style="text-align: center; margin: 1em 0;"></h3>
                            <h3 class="clicky" style="text-align: center; margin: 5px 0;">Click the button below to reset your password.</h3>
                
                           
                            <a href=${resetUrl}>
                            
                                <button class="reset-button" type="submit" style="display: block; height: 50px; width: 250px; margin: 2em auto 3em auto; background: #FF4239; background-image: -webkit-linear-gradient(top, #FF4239, #CF2D25); background-image: -moz-linear-gradient(top, #FF4239, #CF2D25); background-image: -ms-linear-gradient(top, #FF4239, #CF2D25); background-image: -o-linear-gradient(top, #FF4239, #CF2D25); background-image: -webkit-gradient(to bottom, #FF4239, #CF2D25); color: #fff; font-size: 16px; box-shadow: 0 0 5px 0 #75777C; -webkit-border-radius: 5px; -moz-border-radius: 5px; border-radius: 5px; border: solid #FF4239 1px;">RESET YOUR PASSWORD</button>
                          </a>
                
                             <p class="ignore-text" style="text-align: center;">If you did not request this password reset, you can safely ignore and delete this email. </p>
                
                        </div>
                
                    </div>
                    
                </body>
                </html>`
            });
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;

            await user.save()
            console.log(error)
            return res.status(400).json({ success: false, message: "Email could not be sent", error: error })
        }


        return res.status(200).json({ success: true, message: "Email sent" })

    } catch (error: any) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

}


const emailBody = (name: string, resetLink: string): string => {
    let text = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./index.css">
        <title>Document</title>
    </head>
    <body>
    
    <style>
    
    * {
        padding: 0;
        margin: 0;
    }
    html{
        background-color: #6a81ac;
    }
    
    body{
        height: 100vh;
        width: 100vw;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    
    .mainContent{
        width: 80%;
        height: 80%;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 8px;
    
        background-color: #fff;
    }
    
    .mainContent img{
        height: 190px;
        width: 260px;
    }
    
    .greeting-user{
        text-align: center;
        margin: 0 0 1em 0;
    }
    
    h3{
        text-align: center;
    }
    
    .fyp{
        margin: 1em 0;
    }
    
    .clicky{
        margin: 5px 0;
    }
    
    .reset-button {
        display: block;
        height: 50px;
        width: 250px;
        margin: 2em auto 3em auto;
        background: #FF4239;
        background-image: -webkit-linear-gradient(top, #FF4239, #CF2D25);
        background-image: -moz-linear-gradient(top, #FF4239, #CF2D25);
        background-image: -ms-linear-gradient(top, #FF4239, #CF2D25);
        background-image: -o-linear-gradient(top, #FF4239, #CF2D25);
        background-image: -webkit-gradient(to bottom, #FF4239, #CF2D25);
        color: #fff;
        font-size: 16px;
        box-shadow: 0 0 5px 0 #75777C;
        -webkit-border-radius: 5px;
        -moz-border-radius: 5px;
        border-radius: 5px;
        border: solid #FF4239 1px;
    }
    
    .ignore-text{
        text-align: center;
    }
    </style>
       
        <div class="mainContent">
          
            <div>
                <h2 class="greeting-user">Hello ${name}! Forgot your password?</h2>
                <h3 class="fyp"></h3>
                <h3 class="clicky">Click the button below to reset your password.</h3>
    
                <form action="https://www.w3docs.com/" method="get" target="_blank">
                    <a href=${resetLink}>
                    <button class="reset-button" >RESET YOUR PASSWORD</button>
                    </a>
                 </form>
    
                 <p class="ignore-text">If you did not request this password reset, you can safely ignore and delete this email. </p>
    
            </div>
    
        </div>
        
    </body>
    </html>`

    return text

}