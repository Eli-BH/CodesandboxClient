//SELECT Status__c, Id, RecordTypeId, Record_Type_ID__c FROM Forms__c WHERE RecordType.Name = 'Employment Docs' AND Contact__c = '0038G000009BRHsQAO' AND isMostRecent__c = true
//Contact__c = sfid 

import pool from '../../utils/connectSalesforce'
import type { NextApiRequest, NextApiResponse } from 'next'
import Caregiver from '../../models/CaregiverModel'

type Data = {
    success: boolean
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {

    } catch (error: any) {
        console.log(error)
        res.status(500).json({ success: false, message: error.message })
    }
}
