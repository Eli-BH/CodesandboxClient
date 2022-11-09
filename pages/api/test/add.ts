// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../utils/connectMongo";
import Admin from "../../../models/AdminModel";

export default async function addTest(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //   const { firstName, email, password } = req.body;

  console.log("connecting to mongo");

  await dbConnect();

  console.log("Connected to mongo");

  console.log("Creating document");

  const test = await Admin.create({
    firstName: "eli",
    email: "eli@mail.com",
    password: "password",
  });

  console.log("Created doc");

  res.json({ test });
}
