import mongoose, { Document, Schema } from "mongoose";

// Define the interface for the Job document
export interface IJob extends Document {
  company: mongoose.Types.ObjectId; // Reference to a Companies model
  jobTitle: string;
  jobType: string;
  location: string;
  salary: number;
  vacancies?: number;
  experience: number;
  detail: Array<{ desc: string; requirements: string }>;
  application: mongoose.Types.ObjectId[]; // Array of references to Users model
}

// Define the job schema
const jobSchema = new Schema<IJob>(
  {
    company: { type: Schema.Types.ObjectId, ref: "Companies" },
    jobTitle: { type: String, required: [true, "Job Title is required"] },
    jobType: { type: String, required: [true, "Job Type is required"] },
    location: { type: String, required: [true, "Location is required"] },
    salary: { type: Number, required: [true, "Salary is required"] },
    vacancies: { type: Number },
    experience: { type: Number, default: 0 },
    detail: [{ desc: { type: String }, requirements: { type: String } }],
    application: [{ type: Schema.Types.ObjectId, ref: "Users" }],
  },
  { timestamps: true }
);

// Create the Job model
const Jobs = mongoose.model<IJob>("Jobs", jobSchema);

export default Jobs;
