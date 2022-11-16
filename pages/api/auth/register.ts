import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import Caregiver from "../../../models/CaregiverModel";


dbConnect()

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    const {
        firstName,
        lastName,
        email,
        password,
        role,
        address,
        address2,
        state,
        zip,
        city,
        dateOfBirth,
        phone,
    } = req.body

    try {
        //check for existing user 
        const existingUser = (await Caregiver.findOne({ email })) || (await Patient.findOne({ email }));

        if (existingUser) return res.status(400).json({ success: false, message: "User with that email already exists" });

        //create a new user 
        let newUser
        if (role === "Caregiver") {
            newUser = await Caregiver.create({
                firstName,
                lastName,
                email,
                password,
                phone,
                dateOfBirth,
                address,
                address2,
                state,
                zip, city
            })
        }
        else if (role === "Patient") {
            newUser = await Patient.create({
                firstName,
                lastName,
                email,
                password,
                phone,
                dateOfBirth,
                address,
                address2,
                state,
                zip,
                city,
            })
        }

        //salesforce update

        // await pool.query(
        //     "INSERT INTO salesforce.Contact(Birthdate, FirstName, LastName, Email, caller_type__c, Primary_Language__c, Phone, RecordTypeId, MailingCity, MailingPostalCode, MailingState, MailingStreet) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
        //     [
        //         dateOfBirth,
        //         firstName,
        //         lastName,
        //         email,
        //         sfType,//role
        //         _language,//english
        //         phone,//phone
        //         user.callerType,//newUser.callerType
        //         MailingCity,//city
        //         MailingPostalCode,//zip
        //         MailingState,//state
        //         address2 ? `${MailingStreet} ${address2}` : MailingStreet,//mailing street
        //     ]
        // );


        //update intake flag
        newUser.flags.intake = 'pending';

        //save new user updates to mongo
        await newUser.save()


        sendToken(newUser, 200, res)
    } catch (error) {

        console.log(error)
        res.json({ success: false, message: error })
    }
}


const sendToken = (user: any, statusCode: number, res: NextApiResponse) => {
    const token = user.getSignedToken();

    res
        .status(statusCode)
        .json({ success: true, token, userType: user.userType });
};
