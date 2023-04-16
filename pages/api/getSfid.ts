import type { NextApiRequest, NextApiResponse } from 'next'
import Caregiver from '../../models/CaregiverModel'



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const { email } = req.body


    try {

        const userSfid = await Caregiver.findOne({ email })


        if (!userSfid) res.status(404).json({ success: false, error: 'sfid not found' })


        res.status(200).json({ success: true, sfid: userSfid.sfid, state: userSfid.state })


    } catch (error) {

        console.log(error)
        res.status(500).json({ success: false, error: error })
    }
}