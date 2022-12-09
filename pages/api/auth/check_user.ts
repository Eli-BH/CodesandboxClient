import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../utils/connectSalesforce";
import Caregiver from "../../../models/CaregiverModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;

    if (!email) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid email or password", redirect: false });
    }

    try {

        let foundUser = await pool.query('SELECT FirstName, LastName, Birthdate,Sfid, Email, Primary_Language__c, Phone, RecordTypeId, MailingCity, MailingPostalCode, MailingState, MailingStreet FROM salesforce.Contact WHERE Email = $1', [email])

        let usageCheck = await pool.query("SELECT * FROM salesforce.Contact WHERE Email = $1", [email])

        if (!foundUser) return res.status(404).json({ success: false, message: "No account", redirect: true })

        foundUser = foundUser.rows[0]


        res.status(200).json({ success: true, foundUser, usageCheck })


    } catch (error: any) {
        console.log(error)
        res.status(500).json({ success: false, error: error.message })
    }
}