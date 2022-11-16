import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

interface IPatient extends Document {
  firstName: string; //
  lastName: string;
  email: string;
  password: string;
  role: string;
  resetPasswordToken: string;
  resetPasswordExpire: string;
  invalidLoginCounter: number;
  accountStatus: string;
  accountLockTime: Date;
  caregiver: string; //
}

const patientSchema: Schema = new Schema<IPatient>(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    callerType: {
      type: String,
      default: "012360000004aEtAAI",
    },
    userType: {
      type: String,
      default: "Patient",
    },
    zip: {
      type: String,
    },
    address: {
      type: String,
    },
    address2: {
      type: String,
    },
    medicaidId: String,
    MailingAddress: String,
    DateOfBirth: String,
    County: String,
    flags: {
      intake: {
        type: String,
        default: "incomplete",
      },
    },
    email: {
      type: String,
      required: [true, "Email not provided"],
      unique: [true, "Email already taken"],
      match: [
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "Please provide a validemail",
      ],
      lowercase: true,
    },
    servicedCounties: [],
    password: {
      type: String,
      required: [true, "Password not provided"],
      minlength: 6,
    },
    state: {
      default: "New York",
      type: String,
    },
    city: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    phone: String,
    mobile: String,
    caregiver: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    sfid: String,
    invalidLoginCounter: {
      type: Number,
      default: 0,
    },
    lastPage: String,
  },
  { timestamps: true }
);

patientSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

patientSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

patientSchema.methods.getSignedToken = function (): never {
  return jwt.sign({ id: this._id }, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: "3 days",
  });
};

patientSchema.methods.getResetPassword = function (): string {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

patientSchema.methods.incrementInvalidPasswordCounter = function (): void {
  this.invalidLoginCounter++;

  if (this.invalidLoginCounter === 3) {
    this.accountLockTime = Date.now();
    this.accountStatus = "locked";
  }
};

const Patient = models.Patient || model<IPatient>("Patient", patientSchema);

export default Patient;
