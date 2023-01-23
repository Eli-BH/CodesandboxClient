// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import Caregiver from '../../../models/CaregiverModel';
import Patient from '../../../models/PatientModel';
import PCR from '../../../models/PCRModel';

type Data = {
    success: boolean,
    error?: unknown,
    message?: string,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {

        const { caregiverEmail, patientEmail }: { caregiverEmail: string, patientEmail: string } = req.body

        //find caregiver
        const caregiver = await Caregiver.findOne({ email: caregiverEmail })

        //find patient 
        const patient = await Patient.findOne({ email: patientEmail })

        //if either or not found, return error 
        if (!caregiver || !patient) return res.status(404).json({ success: false, message: "User not found" })


        //create a new pcr record 
        const newPCR = await PCR.create({
            caregiverEmail,
            patientEmail,
            caregiverId: caregiver.sfid,
            patientId: patient.sfid,
        })

        //add the new pcr to the pcr array of the caregiver 
        caregiver.pcrRecords.push(newPCR._id)


        caregiver.save()


        //TODO: make queryto create pcr 

        // notify patient 
        //p atient.notifications.push ()

        //patient.save()


        return { success: true, status: 'pending' }


    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
}
