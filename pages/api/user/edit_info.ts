import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '../../../utils/connectMongo';
import pool from '../../../utils/connectSalesforce';
import Caregiver from '../../../models/CaregiverModel';


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    dbConnect();
    const { email } = req.body;
    //`SELECT Id, Status__c, Contact__c, Name FROM Forms__c WHERE RecordType.Name = 'Employment Docs' AND IsMostRecent__c = True AND Contact__c = '${sfid}'`
    try {


        const user = await Caregiver.findOne({ email })


        if (!user) return res.status(404).json({ success: false, message: "User not found" })

        const { sfid } = user

        const status = await pool.query(`SELECT Id, Status__c, Contact__c, Name FROM salesforce.Forms__c WHERE RecordTypeId in (SELECT sfid FROM salesforce.RecordType WHERE Name = 'Employment Docs') AND IsMostRecent__c = True  AND Contact__c = '${sfid}'`)

        if (status.rowCount < 1) return res.status(400).json({ success: false, message: 'No records found' })


        console.log({
            user: user.flags,
            status: status.rows
        })



        if (status.rows[0].status__c === "Approved") {
            user.flags.employeeDocs.status = 'Approved'
            await user.save()
        }
        else if (status.rows[0].status__c === "Requested" || status.rows[0].status === "Declined") {
            user.flags.employeeDocs.status = "Requested"
        }
        else if (status.rows[0].status__c === "Submitted") {
            user.flags.employeeDocs.status = "Submitted"
        }


        res.status(200).json({ success: true })
    } catch (error) {
        console.log(error)
        return res.status(200).json({ success: false, error })
    }
}