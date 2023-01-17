import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt, { Secret } from "jsonwebtoken";
import crypto from "crypto";

interface ICaregiver extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string; //
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  invalidLoginCounter: number;
  accountStatus: string;
  accountLockTime: Date;
  patients: string[];
  callerType: string;
  sfid: string; //
  userType: string; //
  accountLocked: boolean;
  lastLogin: Date;
  activeStatus: string;
  medicaidNumber: string;
  stepNumber: number;
  accountFlag: string;
  flags: any;
  relationship: string;
  patient: string;
  pcrStatus: boolean;
  address: string;
  address2: string;
  state: string;
  zip: string;
  city: string;
  dateOfBirth: string;
  phone: string;
  mobile: string;
  lastPage: string;
}

const caregiverSchema: Schema = new Schema<ICaregiver>(
  {
    firstName: String,
    lastName: String,
    callerType: {
      type: String,
      default: "012360000004aEyAAI",
    },
    email: {
      type: String,
      required: [true, "Email not provided"],
      unique: true,
      match: [
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
        "Please provide a valid email",
      ],
      lowercase: true,
    },
    sfid: String,
    password: {
      type: String,
      required: [true, "Password not provided"],
      minlength: 6, //the front end should be aware of this,
    },
    userType: {
      type: String,
      default: "Caregiver",
    },
    resetPasswordExpire: Date,
    resetPasswordToken: String,
    invalidLoginCounter: {
      type: Number,
      default: 0,
    },
    accountLocked: {
      type: Boolean,
      default: false,
    },
    accountLockTime: {
      type: Date,
    },
    lastLogin: {
      type: Date,
    },
    activeStatus: {
      type: String,
    },
    medicaidNumber: {
      type: String,
    },
    stepNumber: {
      type: Number,
      default: 0,
    },
    accountFlag: {
      type: String,
    },

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
      employeeDocs: {
        title: {
          type: String,
          default: "Employee Documents",
        },
        status: {
          type: String,
          default: "incomplete",
        },
        link: {
          type: String,
          default: '/?page=i9'
        }
      },
      otherTasks: {

        title: {
          type: String,
          default: "Other Tasks"
        },
        status: {
          type: String,
          default: "incomplete"
        },
        link: {
          type: String,
          default: "/?page=otherDocs"
        }
      },
      healthAssessment: {
        title: {
          type: String,
          default: "Health Assessment",
        },
        status: {
          type: String,
          default: "incomplete",
        },
        link: {
          type: String,
          deafult: '/?page=health_assessment'
        }
      },
      WelcomeOrientation: {
        title: {
          type: String,
          default: "Welcome Orientation",
        },
        status: {
          type: String,
          default: "incomplete",
        },
        link: {
          type: String,
          default: '/?page=orientation'
        }
      },


    },
    relationship: String,
    patients: [
      {
        reference: {
          type: Schema.Types.ObjectId,
          ref: "Patient",
        },
        email: String,

        activePCR: {
          type: Boolean,
          default: false,
        },
        activePatient: {
          type: Boolean,
          deafult: false,
        },
      },
    ],
    patient: {
      type: String,
      default: "",
    },
    pcrStatus: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
    },
    address2: {
      type: String,
    },
    state: {
      type: String,

      default: "New York",
    },
    zip: {
      type: String,
    },
    city: {
      type: String,
    },
    dateOfBirth: {
      type: String,
    },
    phone: {
      type: String,
    },
    mobile: {
      type: String,
    },
    lastPage: String,
  },
  {
    timestamps: true,
  }
);

//check if the password has changed before saving as a new one
//hash before it is saved
caregiverSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

caregiverSchema.methods.matchPasswords = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

caregiverSchema.methods.getSignedToken = function (): string {
  return jwt.sign(
    { id: this._id },
    process.env.NEXT_PUBLIC_JWT_SECRET as Secret,
    {
      expiresIn: "3 days",
    }
  );
};

caregiverSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000);

  return resetToken;
};

caregiverSchema.methods.incrementInvalidPasswordCounter = function () {
  this.invalidLoginCounter++;

  if (this.invalidLoginCounter === 3) {
    this.accountLockTime = Date.now();
    this.accountStatus = "locked";
  }
};

const Caregiver =
  models.Caregiver || model<ICaregiver>("Caregiver", caregiverSchema);

export default Caregiver;
