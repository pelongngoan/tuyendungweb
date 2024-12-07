"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCompanyById = exports.getCompanyJobListing = exports.getCompanies = exports.getCompanyProfile = exports.updateCompanyProfile = exports.signIn = exports.register = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const companiesModel_1 = __importDefault(require("../models/companiesModel"));
const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    // Validate fields
    if (!name) {
        next("Company Name is required!");
        return;
    }
    if (!email) {
        next("Email address is required!");
        return;
    }
    if (!password) {
        next("Password is required and must be greater than 6 characters");
        return;
    }
    try {
        const accountExist = await companiesModel_1.default.findOne({ email });
        if (accountExist) {
            next("Email Already Registered. Please Login");
            return;
        }
        // Create a new account
        const company = await companiesModel_1.default.create({
            name,
            email,
            password,
        });
        // User token
        const token = company.createJWT();
        res.status(201).json({
            success: true,
            message: "Company Account Created Successfully",
            user: {
                _id: company._id,
                name: company.name,
                email: company.email,
            },
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.register = register;
const signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        // Validation
        if (!email || !password) {
            next("Please Provide A User Credentials");
            return;
        }
        const company = await companiesModel_1.default.findOne({ email }).select("+password");
        if (!company) {
            next("Invalid email or Password");
            return;
        }
        // Compare password
        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            next("Invalid email or Password");
            return;
        }
        company.password = "";
        const token = company.createJWT();
        res.status(200).json({
            success: true,
            message: "Login Successfully",
            user: company,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.signIn = signIn;
const updateCompanyProfile = async (req, res, next) => {
    const { name, contact, location, profileUrl, about } = req.body;
    try {
        // Validation
        if (!name || !location || !about || !contact || !profileUrl) {
            next("Please Provide All Required Fields");
            return;
        }
        const id = req.body.user.userId;
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            res.status(404).send(`No Company with id: ${id}`);
            return;
        }
        const updateCompany = {
            name,
            contact,
            location,
            profileUrl,
            about,
            _id: id,
        };
        const company = await companiesModel_1.default.findByIdAndUpdate(id, updateCompany, {
            new: true,
        });
        if (!company) {
            return;
        }
        const token = company.createJWT();
        company.password = "";
        res.status(200).json({
            success: true,
            message: "Company Profile Updated Successfully",
            company,
            token,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.updateCompanyProfile = updateCompanyProfile;
const getCompanyProfile = async (req, res, next) => {
    try {
        const id = req.body.user.userId;
        const company = await companiesModel_1.default.findById({ _id: id });
        if (!company) {
            res.status(200).send({
                message: "Company Not Found",
                success: false,
            });
            return;
        }
        company.password = "";
        res.status(200).json({
            success: true,
            data: company,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.getCompanyProfile = getCompanyProfile;
// Get all companies
const getCompanies = async (req, res, next) => {
    try {
        const { search, sort, location } = req.query;
        // Conditions for searching filters
        const queryObject = {};
        if (search) {
            queryObject.name = { $regex: search, $options: "i" };
        }
        if (location) {
            queryObject.location = { $regex: location, $options: "i" };
        }
        let queryResult = companiesModel_1.default.find(queryObject).select("-password");
        // Sorting
        if (sort === "Newest") {
            queryResult = queryResult.sort("-createdAt");
        }
        if (sort === "Oldest") {
            queryResult = queryResult.sort("createdAt");
        }
        if (sort === "A-Z") {
            queryResult = queryResult.sort("name");
        }
        if (sort === "Z-A") {
            queryResult = queryResult.sort("-name");
        }
        // Pagination
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        // Records count
        const total = await companiesModel_1.default.countDocuments(queryResult);
        const numOfPage = Math.ceil(total / limit);
        queryResult = queryResult.limit(limit * page);
        const companies = await queryResult;
        res.status(200).json({
            success: true,
            total,
            data: companies,
            page,
            numOfPage,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.getCompanies = getCompanies;
// Get company jobs
const getCompanyJobListing = async (req, res, next) => {
    const { search, sort } = req.query;
    const id = req.body.user.userId;
    try {
        // Conditions for searching filters
        const queryObject = {};
        if (search) {
            queryObject.location = { $regex: search, $options: "i" };
        }
        let sorting;
        if (sort === "Newest") {
            sorting = "-createdAt";
        }
        if (sort === "Oldest") {
            sorting = "createdAt";
        }
        if (sort === "A-Z") {
            sorting = "name";
        }
        if (sort === "Z-A") {
            sorting = "-name";
        }
        const company = await companiesModel_1.default.findById({ _id: id }).populate({
            path: "jobPosts",
            options: { sort: sorting },
        });
        res.status(200).json({
            success: true,
            companies: company,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.getCompanyJobListing = getCompanyJobListing;
// Get single company
const getCompanyById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const company = await companiesModel_1.default.findById({ _id: id }).populate({
            path: "jobPosts",
            options: {
                sort: "-_id",
            },
        });
        if (!company) {
            res.status(200).send({
                message: "Company Not Found",
                success: false,
            });
            return;
        }
        company.password = "";
        res.status(200).json({
            success: true,
            data: company,
        });
    }
    catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};
exports.getCompanyById = getCompanyById;
