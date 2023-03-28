import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import Caregiver from "../../../models/CaregiverModel";
import pool from "../../../utils/connectSalesforce";
import axios from "axios";

dbConnect();

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
  } = req.body;

  //need to take in the medicaid id
  try {
    //check for existing user
    const existingUser =
      (await Caregiver.findOne({ email })) ||
      (await Patient.findOne({ email }));

    if (existingUser)
      return res
        .status(400)
        .json({
          success: false,
          message: "User with that email already exists",
        });

    //create a new user
    let newUser;
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
        zip,
        city,
      });
    } else if (role === "Patient") {
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
      });
    }

    const melissaCheck = async () => {
      const params = {
        id: process.env.MELISSA_KEY,
        format: "json",
        act: "Check,Verify,Append",
        a1: address,
        a2: address2 || null,
        city,
        state,
        postal: zip,
        ctry: "US",
        email,
      };

      try {
        const { data } = await axios.get(
          "https://personator.melissadata.net/v3/WEB/ContactVerify/doContactVerify",
          { params }
        );

        return data;
      } catch (error) {
        return false;
      }
    };

    // console.log(melissaCheck());

    //salesforce update

    // await pool.query(
    //   "INSERT INTO devsandbox.Contact(Birthdate, FirstName, LastName, Email, caller_type__c, Primary_Language__c, Phone, RecordTypeId, MailingCity, MailingPostalCode, MailingState, MailingStreet) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *",
    //   [
    //     dateOfBirth,
    //     firstName,
    //     lastName,
    //     email,
    //     role,
    //     "english", //english
    //     phone, //phone
    //     newUser.callerType, //newUser.callerType
    //     city, //city
    //     zip, //zip
    //     state, //state
    //     address2 ? `${address} ${address2}` : address, //mailing street
    //   ]
    // );

    //update intake flag
    newUser.flags.employeeDocs.status = "pending";

    //save new user updates to mongo
    await newUser.save();

    res.status(200).json({ success: true, user: { id: newUser._id, email: newUser.email, password: newUser.password } })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error });
  }
}

