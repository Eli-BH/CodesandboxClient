import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import crypto from "crypto";

interface IPatient extends Document {
  firstName: string; //
  lastName: string;
  email: any;
  password: string;
  role: string;
  resetPasswordToken: string;
  resetPasswordExpire: string;
  invalidLoginCounter: number;
  accountStatus: string;
  accountLockTime: Date;
  callerType: string;
  userType: string;
  zip: string;
  address: string;
  address2: string;
  medicaidId: string;
  MailingAddress: string;
  DateOfBirth: string;
  County: string;
  caregiver: string; //
  state: string;
  city: string;
  dateOfBirth: string;
  servicedCounties: any;
  phone: string;
  mobile: string;
  sfid: string;
  lastPage: string;
  notifications: [{
    title: string,
    description: string,
    type: string,
    time?: Date
  }],
  flags: any //write the type for this
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
      demographicInformation: {
        title: {
          type: String,
          default: "Demographic Information",
        },
        status: {
          type: String,
          default: "incomplete",
        },
        link: {
          type: String,
          default: '/?page=profile'
        }
      },
      medicaidVisit: {
        title: {
          type: String,
          default: "Medicaid Nurse Visit"
        },
        status: {
          type: String,
          default: 'incomplete'
        },
        link: {
          type: String,
          default: '/?page=medicaid_visit'
        }
      },
      doctorOrder: {
        title: {
          type: String,
          default: "Doctor Order - DOH"
        },
        status: {
          type: String,
          default: 'incomplete'
        },
        link: {
          type: String,
          default: '/?page=doh'
        }
      },
      authorization: {
        tite: {
          type: String,
          default: "Authorization"
        },
        status: {
          type: String,
          default: 'incomplete'
        },
        link: {
          type: String,
          default: '/?page=authorization'
        }
      },
      welcomeOrientation: {
        title: {
          type: String,
          default: "Welcome Orientation"
        },
        status: {
          type: String,
          default: 'incomplete'
        },
        link: {
          type: String,
          default: '/?page=orientation'
        }

      }
    },
    email: {
      type: String,
      required: true,
      unique: true,
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

patientSchema.methods.getSignedToken = function () {
  return jwt.sign({ id: this._id }, process.env.NEXT_PUBLIC_JWT_SECRET as Secret, {
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
