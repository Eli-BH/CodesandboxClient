import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../utils/connectMongo'
import Patient from '../../../models/PatientModel'
import Caregiver from '../../../models/CaregiverModel'


export default async function getUserInfo(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const {
        query: {
            id
        },
        method
    } = req



    try {
        switch (method) {
            case 'GET':
                //code get info from db

                return
            case 'PUT':
                //code to update user info 
                return
            default:
                res.setHeader('Allow', ['GET', 'PUT'])
                res.status(405).end(`Method ${method} Not Allowed`)
        }
    } catch (error) {
        res.status(500).json(error)
    }

}