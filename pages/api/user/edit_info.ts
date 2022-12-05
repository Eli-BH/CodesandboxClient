import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from '../../../utils/connectMongo';


export default async function editUserInfo(
    req: NextApiRequest,
    res: NextApiResponse
) {
    dbConnect();
    const { email } = req.body;
    try {


    } catch (error) {
        console.log(error)
        return res.status(200).json({ success: false, error })
    }
}