import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";

// Define the custom type for the request object to include the user information
interface CustomRequest extends Request {
  body: {
    user?: {
      userId: string;
    };
  };
}

const userAuth = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers?.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return next("Authentication failed");
  }

  const token = authHeader.split(" ")[1];

  try {
    // Assuming JWT_SECRET_KEY is a string
    const userToken = JWT.verify(token, process.env.JWT_SECRET_KEY as string);

    // Cast userToken as any or define a more specific type for it
    req.body.user = {
      userId: (userToken as { userId: string }).userId,
    };

    next();
  } catch (error) {
    console.log(error);
    next("Authentication failed");
  }
};

export default userAuth;
