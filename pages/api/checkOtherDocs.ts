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

        //TODO: Query for other docs
    } catch (error) {

        console.log(error)
        res.status(500).json({ success: false, error: error })
    }
}