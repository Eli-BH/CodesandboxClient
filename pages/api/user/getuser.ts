import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import Caregiver from "../../../models/CaregiverModel";

export default async function getuser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  try {
    const { email } = req.body;

    const user =
      (await Patient.findOne({ email: email })) ||
      (await Caregiver.findOne({ email: email }));

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const { firstName, userType } = user;

    return res.status(200).json({
      success: true,
      data: { firstName: firstName, userType: userType },
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
