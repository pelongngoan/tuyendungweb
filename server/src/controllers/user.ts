import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import Users from "../models/userModel";

// Define types for the request body if needed, or use `req.body` directly for dynamic typing
interface UpdateUserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
  location?: string;
  profileUrl?: string;
  jobTitle: string;
  about: string;
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    email,
    contact,
    location,
    profileUrl,
    jobTitle,
    about,
  }: UpdateUserRequestBody = req.body;

  try {
    if (!firstName || !lastName || !email || !contact || !jobTitle || !about) {
      return next(new Error("Please provide all required fields"));
    }

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send(`No User with id: ${id}`);
      return;
    }

    const updateUser = {
      firstName,
      lastName,
      email,
      contact,
      location,
      profileUrl,
      jobTitle,
      about,
      _id: id,
    };

    const user = await Users.findByIdAndUpdate(id, updateUser, { new: true });

    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const token = user.createJWT();

    user.password = "";

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user,
      token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.body.user.userId;

    const user = await Users.findById({ _id: id });

    if (!user) {
      res.status(200).send({
        message: "User Not Found",
        success: false,
      });
      return;
    }

    user.password = "";

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      message: "auth error",
      success: false,
      error: error.message,
    });
  }
};
