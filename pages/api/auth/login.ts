import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Patient from "../../../models/PatientModel";
import Caregiver from "../../../models/CaregiverModel";

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



    if (user.accountLocked == true) {
      return res
        .status(400)
        .json({ success: false, message: "Account Locked, please reset password" });
    }

    const passwordMatch = await user.matchPasswords(password);

    if (!passwordMatch) {
      user.invalidLoginCounter += 1;

      await user.save();
      return res
        .status(400)
        .json({ success: false, message: "Invalid email or password" });
    }

    if (user.invalidLoginCounter >= 10) {
      user.accountLocked = true; //
      user.accountLockTime = Date.now();

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
    //     "UPDATE devsandbox.Contact set	LastWebAppLogin__c = $1 WHERE Email = $2",
    //     [currentLoginTime, email]
    //   );
    // }
    return res.status(200).json({
      success: true,
      user: { id: user._id, email: user.email, name: user.firstName },
    });
  } catch (error: any) {
    //console.log({ error: error.message, location: "login" });
    res.status(500).json({ success: false, error: error.message });
  }
}
