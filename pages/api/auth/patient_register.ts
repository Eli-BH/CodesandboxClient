import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import fs from 'fs';
import xml2js from 'xml2js';
import axios from 'axios'
import path from 'path';
import pool from "../../../utils/connectSalesforce";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect();
        const intakeType = "Straight Medicaid to MLTC";
        const {
            email,
            medicaidId,
            password,
            phone
        } = <{
            email: string,
            medicaidId: string,
            password: string,
            phone: string
        }>req.body


        // check if the user already exists 

        const existingUser = await Patient.findOne({ email: email })
        if (existingUser) return res.status(400).json({ success: false, message: "User already exists" })


        //salesforce update

        //check if the user is already in salesforce 
        // const existingSfUser = await pool.query(
        //   "SELECT id FROM devsandbox.Contact WHERE Email = $1",
        //   [email]
        // );


        // const existingSfUserPhone = await pool.query(
        //   "SELECT id FROM devsandbox.Contact WHERE Phone = $1",
        //   [phone]
        // );


        // const existingSfUserMedicaid = await pool.query(
        //   "SELECT id FROM devsandbox.Contact WHERE medicaid__c = $1",
        //   [medicaidId]
        // );

        // if(existingSfUserMedicaid){
        //   return res.status(500).json({success: false, code: 'sf', message: "Medicaid ID already on file"})
        // }

        // if(existingSfUser.rows|| existingSfUserPhone){
        //   return res.status(500).json({success: false, code: 'sf', message: "User already has freedomcare information on file"})
        // }

        //check the medicaid ID from epaces 
        // const pattern = /^[A-Z]{2}[1-9]{5}[A-Z]$/

        // const validId = pattern.test(medicaidId);

        // if (!validId) res.status(500).json({ success: false, message: 'Invalid ID' })


        const file = path.resolve('public', 'epaces.xml')

        //create a new object that holds the resulting info
        let finalObj: any = {}


        const fileData = fs.readFileSync(file)

        let parser = new xml2js.Parser()

        //parse the epaces xml file template
        const result: any = await new Promise((resolve, reject) => parser.parseString(fileData, (err, result) => {
            if (err) reject(err);
            else resolve(result)
        }))

        //set the policy number to the medicare ID
        result["soap:Envelope"]["soap:Body"][0].CheckEligibility[0].policyNumber = medicaidId;


        let builder = new xml2js.Builder();

        // json => xml
        let xml = builder.buildObject(result)


        // send the xml to epaces
        const { data } = await axios.post("https://www.soljen-websrvc.com/EligibilityHealthInsurance.asmx", xml, {
            headers: {
                "Content-Type": "text/xml"
            }
        });


        let stringData: any;

        //xml response from epaces => json
        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).json({ success: false, message: err })


            stringData = JSON.stringify(result);
        });

        //stringified data => json
        let jsonData = JSON.parse(stringData)


        //parse the result 
        let jsonSpecData =
            jsonData["soap:Envelope"][
                "soap:Body"
            ][0].CheckEligibilityResponse[0].CheckEligibilityResult[0].split(";");



        // add the new data to the final object
        for (let word of jsonSpecData) {

            let itemArr = word.split(':');

            if (itemArr.length > 1) {
                finalObj[itemArr[0].slice(2)] = itemArr[1];
            }
        }


        if (finalObj["Medicaid Eligibility Status"] !== "Active") {
            return res.status(400).json({ success: false, message: "Medicaid Eligibility Status is Inactive" })
        }
        /* Beginning of registration */


        //city, state, zip
        let csz = finalObj["CSZ"].split(",");

        const newUser = await Patient.create({
            firstName: finalObj.Firstname,
            lastName: finalObj.Lastname,
            email,
            password,
            phone,
            dateOfBirth: finalObj["Date of Birth"],
            address: finalObj["Address 1"],
            state: csz[1],
            zip: csz[2],
            city: csz[0],
        })

        newUser.flags.demographicInformation.status = 'pending'

        await newUser.save();

        // Add user to salesforce 
        let newSfUser = await pool.query(
            "INSERT INTO devsandbox.Contact(Birthdate, FirstName, LastName, Email, caller_type__c, Primary_Language__c, Phone, RecordTypeId, MailingCity, MailingPostalCode, MailingState, MailingStreet, intakeType,There_is_a_Designated_Representative__c, medicaid__c ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15) RETURNING *",
            [
                finalObj["Date of Birth"],
                finalObj.Firstname,
                finalObj.Lirstname,
                email,
                "Patient",
                "english",
                phone, //phone
                newUser.callerType, //newUser.callerType
                csz[0], //city
                csz[2], //zip
                csz[1], //state
                finalObj["Address 2"] ? `${finalObj["Address 1"]} ${finalObj["Address 2"]}` : finalObj["Address 1"], //mailing street
                intakeType,
                "No",
                medicaidId
            ]
        );



        return res.status(200).json({ success: true, message: 'valid', epaces: finalObj, salesforce: newSfUser })


    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, message: error })
    }
}



