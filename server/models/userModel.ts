import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// Define the interface for the user document
export enum MAYJOR {
  England = "England",
  Arab = "Arab",
  China = "China",
  France = "France",
  Germany = "Germany",
  Japan = "Japan",
  Korea = "Korea",
  Russia = "Russia",
  Economy = "Economy",
  Tradition = "Tradition",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: string;
  contact?: string;
  mayjor?: MAYJOR;
  comparePassword(userPassword: string): Promise<boolean>;
  createJWT(): string;
}

// Schema definition
const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      required: [true, "First Name is Required!"],
    },
    lastName: {
      type: String,
      required: [true, "Last Name is Required!"],
    },
    email: {
      type: String,
      required: [true, "Email is Required!"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Required!"],
      minlength: [6, "Password length should be greater than 6 characters"],
      select: true,
    },
    accountType: { type: String, default: "seeker" },
    contact: { type: String },
    mayjor: {
      type: String,
      enum: Object.values(MAYJOR), // Use enum values here
    },
  },
  { timestamps: true }
);

// Middleware to hash the password before saving
userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
userSchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

// Method to create JWT
userSchema.methods.createJWT = function (): string {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });
};

const Users = mongoose.model<IUser>("Users", userSchema);

export default Users;
