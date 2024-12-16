import mongoose, { Document } from "mongoose";

const { Schema } = mongoose;

export type UserDocument = Document & {
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    emailVerified: { type: Date },
    image: { type: String },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
