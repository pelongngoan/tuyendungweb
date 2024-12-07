import mongoose from "mongoose";
import { Request, Response, NextFunction } from "express";
import Users, { MAYJOR } from "../models/userModel";

interface UpdateUserRequestBody {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  accountType: string;
  contact?: string;
  mayjor?: MAYJOR;
}

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, email, contact, mayjor }: UpdateUserRequestBody =
    req.body;

  try {
    if (!firstName || !lastName || !email || !contact) {
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
      mayjor,
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
    // Get the userId from the URL params
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404).send("Invalid User ID");
      return;
    }

    const user = await Users.findById(userId);

    if (!user) {
      res.status(404).send({
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
