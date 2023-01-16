import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import fs from 'fs';
import xml2js from 'xml2js';
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect();
        const intakeType = "Straight Medicaid to MLTC";
        const {
            email,
            medicaidId,
            password
        } = <{
            email: string,
            medicaidId: string,
            password: string
        }>req.body


        // check if the user already exists 

        const existingUser = await Patient.findOne({ email: email })
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" })


        //check the medicaid ID from epaces 
        const pattern = /^[A-Z]{2}[1-9]{5}[A-Z]$/

        const validId = pattern.test(medicaidId);

        if (!validId) res.status(500).json({ success: false, message: 'Invalid ID' })

        fs.readFile(__dirname + "../../../utils/epaces.xml", (err, data) => {
            //parse the xml file to json 
            let parser = new xml2js.Parser();

            if (err) {
                console.log(err)
                return res.status(400).json({ success: false, message: err })
            }


            parser.parseString(data, async (err: any, result: any) => {
                if (err) {
                    console.log(err)
                    return res.status(400).json({ success: false, message: err })
                }

                // set the policy numer to the medicare id
                result["soap:Envelope"]["soap:Body"][0].CheckEligibility[0].policyNumber = medicaidId;

                let builder = new xml2js.Builder();

                // json => xml
                let xml = builder.buildObject(result);

                //send the xml file to the epaces route 
                const { data } = await axios.post("https://www.soljen-websrvc.com/EligibilityHealthInsurance.asmx", xml, {
                    headers: {
                        "Content-Type": "text/xml"
                    }
                });

                let stringData: any;

                // xml response from epaces => json
                xml2js.parseString(data, (err: any, result: any) => {
                    if (err) return res.status(500).json({ success: false, message: err })

                    stringData = JSON.parse(result)
                })

                // stringified data => json
                let jsonData = JSON.parse(stringData)

                //parse the resulting json data
                let jsonSpecData = jsonData["soap:Envelope"]["soap:Body"][0].CheckEligibilityResponse[0].checkEligibilityResult[0].split(';')

                //create a new object that holds the resulting info
                let finalObj: any = {}

                for (let word of jsonSpecData) {

                    let itemArr = word.split(':');

                    if (itemArr.length > 1) {
                        finalObj[itemArr[0].slice(2)] = itemArr[1];
                    }
                }

                res.status(200).json({ success: true, message: 'valid', data: finalObj })
            })


        })


    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error })
    }
}