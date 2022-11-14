import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import Caregiver from "../../../models/CaregiverModel";
import crypto from "crypto";

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;
  await dbConnect();

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email or password" });
  }

  try {
    const user =
      (await Patient.findOne({ email: email })) ||
      (await Caregiver.findOne({ email: email }));

    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const passwordMatch = await user.matchPasswords(password);

    if (!passwordMatch) {
      user.invalidLoginCounter += 1;

      await user.save();
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    if (user.invalidLoginCounter >= 5) {
      user.accountLocked = true; //
      user.accountLockTime = Date.now;

      await user.save();

      return res
        .status(400)
        .json({ success: false, message: "Too many attempts, account Locked" });
    }

    user.invalidLoginCounter = 0; //

    const now = new Date(Date.now());
    const currentLoginTime = now.toISOString();

    user.lastLoginTime = currentLoginTime;
    await user.save();

    //dev
    // if ((process.env.ENVIRONMENT = "live")) {
    //   await pool.query(
    //     "UPDATE salesforce.Contact set	LastWebAppLogin__c = $1 WHERE Email = $2",
    //     [currentLoginTime, email]
    //   );
    // }
    sendToken(user, 200, res);
  } catch (error: any) {
    console.log({ error: error.message, location: "login" });
    res.status(500).json({ success: false, error: error.message });
  }
}

const sendToken = (user: any, statusCode: number, res: NextApiResponse) => {
  const token = user.getSignedToken();

  res
    .status(statusCode)
    .json({ success: true, token, userType: user.userType });
};
