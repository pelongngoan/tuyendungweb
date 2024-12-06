import { Request, Response, NextFunction } from "express";
import Users from "../models/userModel";
import { IUser } from "../models/userModel"; // Make sure to define IUser interface in the user model

// Register controller
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, email, password } = req.body;
  console.log(email);
  console.log(password);
  console.log(firstName);
  console.log(lastName);

  // Validate fields
  if (!firstName) {
    next("First Name is required");
    return;
  }
  if (!email) {
    next("Email is required");
    return;
  }
  if (!lastName) {
    next("Last Name is required");
    return;
  }
  if (!password) {
    next("Password is required");
    return;
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password,
    });

    // User token
    const token = await user.createJWT();

    res.status(201).send({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        accountType: user.accountType,
      },
      token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Sign-in controller
export const signIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Validation
    if (!email || !password) {
      next("Please Provide A User Credentials");
      return;
    }

    // Find user by email
    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      next("Invalid email or password");
      return;
    }

    // Compare password
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      next("Invalid email or password");
      return;
    }

    user.password = "";

    const token = user.createJWT();

    res.status(200).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error: any) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
