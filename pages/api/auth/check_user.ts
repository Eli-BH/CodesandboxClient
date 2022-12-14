import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../utils/connectSalesforce";
import Caregiver from "../../../models/CaregiverModel";
import dbConnect from '../../../utils/connectMongo';
dbConnect()


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid email or password", redirect: false });
    }

    try {
        //redirect sends the user to the login page 
        // redirect only if the user is foundin the mongo db



        let user = await Caregiver.findOne({ email })
        if (user) return res.status(200).json({ success: true, message: 'user found', redirect: true })

        let foundUser = await pool.query("SELECT * FROM salesforce.Contact WHERE Email = $1", [email])

        console.log(foundUser)
        if (!foundUser) return res.status(404).json({ success: false, message: "No account", redirect: true })

        return res.status(200).json({ success: true, redirect: false, user: foundUser?.rows[0] })

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}