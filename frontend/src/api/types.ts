import { MAYJOR } from "./enum";

type User = {
  firstName: string;
  lastName: string;
  email: string;
  accountType: string;
  contact?: string;
  mayjor?: MAYJOR | undefined;
};
type IJobDetail = {
  desc: string;
  requirements: string;
};

type IJob = {
  _id: string; // ID of the job (MongoDB ObjectId)
  company: string; // ID of the company (MongoDB ObjectId or string reference)
  jobTitle: string;
  jobType: string;
  location: string;
  salary: number;
  vacancies?: number; // Optional field
  experience: number;
  detail: IJobDetail[]; // Array of job detail objects
  application: string[]; // Array of user IDs (MongoDB ObjectIds or strings)
  createdAt?: string; // Optional timestamps (added by Mongoose)
  updatedAt?: string; // Optional timestamps (added by Mongoose)
};

export type { User, IJob, IJobDetail };
