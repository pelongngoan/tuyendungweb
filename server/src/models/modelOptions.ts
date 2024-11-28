import { SchemaOptions } from "mongoose";
import { IUser } from "./userModel";

const modelOptions: SchemaOptions<IUser> = {
  toJSON: {
    virtuals: true,
    transform: (_, obj: Partial<IUser>) => {
      delete obj._id; // Ensure that the `_id` property is deleted
      return obj;
    },
  },
  toObject: {
    virtuals: true,
    transform: (_, obj: Partial<IUser>) => {
      delete obj._id; // Ensure that the `_id` property is deleted
      return obj;
    },
  },
  versionKey: false,
  timestamps: true,
};

export default modelOptions;
