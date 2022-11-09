import { Schema, model, models } from "mongoose";

interface IAdmin {
  firstName: string;
  email: string; //
  password: string;
}

const adminSchema = new Schema<IAdmin>({
  firstName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Admin = models.Admin || model<IAdmin>("Admin", adminSchema);

export default Admin;
