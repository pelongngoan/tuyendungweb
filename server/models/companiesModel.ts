import mongoose, { Document, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

// Define the interface for the Company document
interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  contact?: string;
  location?: string;
  about?: string;
  profileUrl?: string;
  jobPosts: mongoose.Types.ObjectId[]; // Array of references to Jobs
  comparePassword(userPassword: string): Promise<boolean>;
  createJWT(): string;
}

// Define the company schema
const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: [true, "Company Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: true,
    },
    contact: { type: String },
    location: { type: String },
    about: { type: String },
    profileUrl: { type: String },
    jobPosts: [{ type: Schema.Types.ObjectId, ref: "Jobs" }],
  },
  { timestamps: true }
);

// Middleware to hash the password before saving
companySchema.pre<ICompany>("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
companySchema.methods.comparePassword = async function (
  userPassword: string
): Promise<boolean> {
  return await bcrypt.compare(userPassword, this.password);
};

// Method to create JWT
companySchema.methods.createJWT = function (): string {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: "1d",
  });
};

// Create the Company model
const Companies = mongoose.model<ICompany>("Companies", companySchema);

export default Companies;
