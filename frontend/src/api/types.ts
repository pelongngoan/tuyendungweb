import { MAYJOR } from "./enum";

export interface RegisterParams {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  age?: number;
  location?: string;
  major?: string;
  phone?: string;
  role?: string;
}

export interface LoginParams {
  email: string;
  password: string;
}
export interface JobPost {
  id: string;
  company: string;
  title: string;
  location: string;
  salary: string;
  description: string;
  requirements: string;
  benefit: string;
  experience: string;
  mayjor: MAYJOR[];
  other: { label: string; content: string }[];
}

export type JobPostDetail = {
  id: string;
  title: string;
  company: string;
  description: string;
  salary: string;
  experience: string;
  location: string;
  createdAt: string;
  position: string;
  phone: string;
  workingTime: string;
  requirements: string;
  advantages: string;
};
export type IntershipPostDetail = {
  id: string;
  company: string;
  title: string;
  description: string;
  requirements: string;
  experience: string;
  mayjor: MAYJOR[];
  createdAt: string;
};
export interface InternshipPost {
  id: string;

  company: string;
  title: string;
  description: string;
  requirements: string;
  experience: string;
  mayjor: MAYJOR[];
  other: { label: string; content: string }[];
}
