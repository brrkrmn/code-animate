import mongoose, { Document } from "mongoose";
import { SceneDocument } from "./scene";
import { UserDocument } from "./user";

const { Schema } = mongoose;

export type AccountDocument = Document & {
  userId: UserDocument;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token: string;
  access_token: string;
  expires_at: number;
  token_type: string;
  scope: string;
  id_token: string;
  session_state: string;
  scenes: SceneDocument[];
  createdAt: Date;
  updatedAt: Date;
};

const AccountSchema = new Schema<AccountDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    providerAccountId: {
      type: String,
      required: true,
    },
    refresh_token: { type: String },
    access_token: { type: String },
    expires_at: { type: Number },
    token_type: { type: String },
    scope: { type: String },
    id_token: { type: String },
    session_state: { type: String },
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

AccountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export const Account = mongoose.model("Account", AccountSchema);
