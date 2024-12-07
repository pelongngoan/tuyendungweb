"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteJobPost = exports.getJobById = exports.getJobPosts = exports.updateJob = exports.createJob = exports.isAdmin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jobModel_1 = __importDefault(require("../models/jobModel"));
const companiesModel_1 = __importDefault(require("../models/companiesModel"));
const isAdmin = (req, res, next) => {
    const userRole = req.body.user.role; // Assuming the role is attached to the user object
    if (userRole !== "admin") {
        return res.status(403).json({
            success: false,
            message: "Permission denied. Admin access only.",
        });
    }
    next();
};
exports.isAdmin = isAdmin;
const createJob = async (req, res, next) => {
    try {
        const { jobTitle, jobType, location, salary, vacancies, experience, desc, requirements, } = req.body;
        if (!jobTitle ||
            !jobType ||
            !location ||
            !salary ||
            !requirements ||
            !desc) {
            next("Please Provide All Required Fields");
            return;
        }
        const id = req.body.user.userId;
        // Ensure the userId is a string before checking if it's a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
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
        const job = new jobModel_1.default(jobPost);
        await job.save();
        // Update the company information with job id
        const company = await companiesModel_1.default.findById(id);
        if (company) {
            company.jobPosts.push(job._id);
            await companiesModel_1.default.findByIdAndUpdate(id, company, { new: true });
        }
        res.status(200).json({
            success: true,
            message: "Job Posted Successfully",
            job,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.createJob = createJob;
const updateJob = async (req, res, next) => {
    try {
        const { jobTitle, jobType, location, salary, vacancies, experience, desc, requirements, } = req.body;
        const { jobId } = req.params;
        if (!jobTitle ||
            !jobType ||
            !location ||
            !salary ||
            !desc ||
            !requirements) {
            next("Please Provide All Required Fields");
            return;
        }
        const id = req.body.user.userId;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
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
        await jobModel_1.default.findByIdAndUpdate(jobId, jobPost, { new: true });
        res.status(200).json({
            success: true,
            message: "Job Post Updated Successfully",
            jobPost,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.updateJob = updateJob;
const getJobPosts = async (req, res, next) => {
    try {
        const { search, sort, location, jtype, exp } = req.query;
        const types = typeof jtype === "string" ? jtype.split(",") : undefined; // Handle 'jtype' query being a string or undefined
        const experience = typeof exp === "string" ? exp.split("-") : undefined; // Handle 'exp' query being a string or undefined
        let queryObject = {};
        if (location) {
            queryObject.location = { $regex: location, $options: "i" };
        }
        if (jtype) {
            queryObject.jobType = { $in: types };
        }
        if (exp) {
            queryObject.experience = {
                $gte: Number(experience[0]) - 1,
                $lte: Number(experience[1]) + 1,
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
        let queryResult = jobModel_1.default.find(queryObject).populate({
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
        const totalJobs = await jobModel_1.default.countDocuments(queryResult);
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
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.getJobPosts = getJobPosts;
const getJobById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const job = await jobModel_1.default.findById({ _id: id }).populate({
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
        let queryResult = jobModel_1.default.find(searchQuery)
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
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.getJobById = getJobById;
const deleteJobPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        await jobModel_1.default.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Job Post Deleted Successfully.",
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.deleteJobPost = deleteJobPost;
