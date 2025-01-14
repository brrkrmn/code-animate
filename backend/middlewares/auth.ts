import { NextFunction, Request, Response } from 'express';
import mongoose from "mongoose";
import { Account } from "../model/account";
import { User } from "../model/user";

export const extractUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return next();
    }

    const accounts = await Account.find({
      access_token: token,
    }).exec();

    if (accounts.length === 0) {
      return next();
    }

    const userId = accounts.find((a) => !!a?.userId)?.userId;

    const user = await User.findById(
      new mongoose.Types.ObjectId(userId as any)
    ).exec();
    if (!user) {
      return next();
    }

    req.user = user;
    next();
  } catch (err) {
    next();
  }
};

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (!user) {
    res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Error:", error.message);

  if (error.name === "CastError") {
    res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    res.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    res.status(401).json({ error: "token expired" });
  }
  next(error);
};
