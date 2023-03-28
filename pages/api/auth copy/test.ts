import type { NextApiRequest, NextApiResponse } from "next";
import pool from "../../../utils/connectSalesforce";


export default async function test(req: NextApiRequest, res: NextApiResponse) {


    try {


        let email = 'shaunbedell14@gmail.com'


        const user = await pool.query(
            "SELECT Name, email, id From devsandbox.Contact WHERE Email = $1", [email]
        );




        return res.status(200).send(user)
    } catch (error) {
        console.log(error)
    }
}