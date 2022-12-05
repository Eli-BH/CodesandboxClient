import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import Caregiver from "../../../models/CaregiverModel";
import sendgrid from '@sendgrid/mail'
import crypto from 'crypto'


sendgrid.setApiKey(process.env.SENDGRID_KEY as string)



export default async function resetPassword(
    req: NextApiRequest,
    res: NextApiResponse
) {

    dbConnect()
    const {
        query: {
            reset_token
        },
        method,
        body: {
            newPassword,
        }
    } = req


    console.log(reset_token, newPassword)


    try {

        //hash a new token 
        const resetPasswordToken = crypto.createHash('sha256').update(reset_token as string).digest('hex')

        //find the user
        const foundUser = await Patient.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        }) || await Caregiver.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        })

        //no user -  return error 
        if (!foundUser) return res.status(400).json({ success: true, message: "User not found" })

        // get new password
        foundUser.password = newPassword;

        // clear users account of login errors
        foundUser.accountLocked = false;

        foundUser.invalidLoginCount = 0;

        //reset the token and expire, we no longer need them
        foundUser.resetPasswordToken = undefined;
        foundUser.resetPasswordExpire = undefined;

        //save the changes
        await foundUser.save();

        return res.status(200).json({ success: true, message: "Success, You will be redirected to login" })

    } catch (error: any) {
        return res.status(error.statusCode || 500).json({ error: error.message });
    }

}