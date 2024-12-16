import mongoose, { Document } from "mongoose";
import { SceneDocument } from "./scene";

const { Schema } = mongoose;

export type UserDocument = Document & {
  name: string;
  email: string;
  emailVerified: Date;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  scenes: SceneDocument[];
};

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    emailVerified: { type: Date },
    image: { type: String },
    scenes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Scene",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", UserSchema);
