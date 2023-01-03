//SELECT Status__c, Id, RecordTypeId, Record_Type_ID__c FROM Forms__c WHERE RecordType.Name = 'Employment Docs' AND Contact__c = '0038G000009BRHsQAO' AND isMostRecent__c = true
//Contact__c = sfid 

import pool from '../../utils/connectSalesforce'
import type { NextApiRequest, NextApiResponse } from 'next'
import Caregiver from '../../models/CaregiverModel'

type Data = {
    name: string
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    res.status(200).json({ name: 'John Doe' })
}
