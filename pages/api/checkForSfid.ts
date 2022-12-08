import type { NextApiRequest, NextApiResponse } from 'next'
import Caregiver from '../../models/CaregiverModel'
import Patient from '../../models/PatientModel'
import pool from '../../utils/connectSalesforce'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { email } = req.body


    try {

        const queryUser = await pool.query("SELECT sfid from salesforce.Contact WHERE email = $1", [email])
        const user = await Caregiver.findOne({ email }) || await Patient.findOne({ email })


        if (queryUser.rowCount) {

            user.flags.demographicInformation.status = 'complete'
            user.sfid = queryUser.rows[0].sfid
            await user.save()
            return res.status(200).json({ success: true, message: 'Contact information accepted' })
        } else {
            return res.status(400).json({ success: false, message: 'Contact information not accepted' })
        }
    } catch (error) {

        console.log(error)
        res.status(500).json({ success: false, error: error })
    }
}