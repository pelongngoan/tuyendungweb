import mongoose, { Document, Model, Schema } from "mongoose";
import crypto from "crypto";
import modelOptions from "./modelOptions";

// Define the interface for the User document
export interface IUser extends Document {
  username: string;
  displayName: string;
  password: string;
  salt: string;
  setPassword(password: string): void;
  validPassword(password: string): boolean;
}

// Define the schema
const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    salt: {
      type: String,
      required: true,
      select: false,
    },
  },
  modelOptions
);

// Add methods to the schema
userSchema.methods.setPassword = function (password: string): void {
  this.salt = crypto.randomBytes(16).toString("hex");

  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

userSchema.methods.validPassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");

  return this.password === hash;
};

// Create and export the model
const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
