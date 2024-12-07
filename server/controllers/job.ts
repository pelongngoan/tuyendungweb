import mongoose, { Types } from "mongoose";
import Jobs from "../models/jobModel";
import Companies from "../models/companiesModel";
import { Request, Response, NextFunction } from "express";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.body.user.role; // Assuming the role is attached to the user object

  if (userRole !== "admin") {
    return res.status(403).json({
      success: false,
      message: "Permission denied. Admin access only.",
    });
  }

  next();
};
interface JobPost {
  jobTitle: string;
  jobType: string;
  location: string;
  salary: number;
  vacancies?: number;
  experience?: string;
  desc: string;
  requirements: string;
}

export const createJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    }: JobPost = req.body;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !requirements ||
      !desc
    ) {
      next("Please Provide All Required Fields");
      return;
    }

    const id = req.body.user.userId;

    // Ensure the userId is a string before checking if it's a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send(`No Company with id: ${id}`);
      return;
    }

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      company: id,
    };

    const job = new Jobs(jobPost);
    await job.save();

    // Update the company information with job id
    const company = await Companies.findById(id);
    if (company) {
      company.jobPosts.push(job._id as any);
      await Companies.findByIdAndUpdate(id, company, { new: true });
    }

    res.status(200).json({
      success: true,
      message: "Job Posted Successfully",
      job,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};

export const updateJob = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    }: JobPost = req.body;
    const { jobId } = req.params;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !desc ||
      !requirements
    ) {
      next("Please Provide All Required Fields");
      return;
    }

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send(`No Company with id: ${id}`);
      return;
    }

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      _id: jobId,
    };

    await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });

    res.status(200).json({
      success: true,
      message: "Job Post Updated Successfully",
      jobPost,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getJobPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search, sort, location, jtype, exp } = req.query;
    const types = typeof jtype === "string" ? jtype.split(",") : undefined; // Handle 'jtype' query being a string or undefined
    const experience = typeof exp === "string" ? exp.split("-") : undefined; // Handle 'exp' query being a string or undefined

    let queryObject: any = {};

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    if (jtype) {
      queryObject.jobType = { $in: types };
    }

    if (exp) {
      queryObject.experience = {
        $gte: Number(experience![0]) - 1,
        $lte: Number(experience![1]) + 1,
      };
    }

    if (search) {
      const searchQuery = {
        $or: [
          { jobTitle: { $regex: search, $options: "i" } },
          { jobType: { $regex: search, $options: "i" } },
        ],
      };
      queryObject = { ...queryObject, ...searchQuery };
    }

    let queryResult = Jobs.find(queryObject).populate({
      path: "company",
      select: "-password",
    });

    // SORTING
    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("jobTitle");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-jobTitle");
    }

    // pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // records count
    const totalJobs = await Jobs.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs / limit);

    queryResult = queryResult.limit(limit * page);

    const jobs = await queryResult;

    res.status(200).json({
      success: true,
      totalJobs,
      data: jobs,
      page,
      numOfPage,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};

export const getJobById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const job = await Jobs.findById({ _id: id }).populate({
      path: "company",
      select: "-password",
    });

    if (!job) {
      res.status(200).send({
        message: "Job Post Not Found",
        success: false,
      });
      return;
    }

    // GET SIMILAR JOB POST
    const searchQuery = {
      $or: [
        { jobTitle: { $regex: job?.jobTitle, $options: "i" } },
        { jobType: { $regex: job?.jobType, $options: "i" } },
      ],
    };

    let queryResult = Jobs.find(searchQuery)
      .populate({
        path: "company",
        select: "-password",
      })
      .sort({ _id: -1 });

    queryResult = queryResult.limit(6);
    const similarJobs = await queryResult;

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};

export const deleteJobPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    await Jobs.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      message: "Job Post Deleted Successfully.",
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(404).json({ message: (error as Error).message });
  }
};
