import { Schema, model, models, Document } from "mongoose";


interface IPCR extends Document {
    caregiverEmail: string;
    patientEmail: string;
    caregiverId: string;
    patientId: string;
    pcrSfid?: string;
    pcrStatus?: string;
}


const pcrSchema: Schema = new Schema<IPCR>(
    {
        caregiverEmail: {
            type: String,
            required: true,
            lowercase: true
        },
        patientEmail: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        caregiverId: {
            type: String,
            required: true,
            lowercase: true
        },
        patientId: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        pcrSfid: {
            type: String,
        },
        pcrStatus: {
            type: String,
            required: true,
            default: "pending"
        }

    }, {
    timestamps: true
}
)

const PCR = model<IPCR>("PCR", pcrSchema)

export default PCR