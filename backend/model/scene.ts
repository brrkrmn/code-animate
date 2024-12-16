import mongoose, { Document, Schema } from "mongoose";
import { AccountDocument } from "./account";

export type StepDocument = Document & {
  number: number;
  content: string;
};

export type EditorDocument = Document & {
  background: string;
  radius: string;
  language: string;
  theme: string;
  extensions: string;
};

export type SceneDocument = Document & {
  user: AccountDocument;
  title: string;
  public: boolean;
  steps: StepDocument[];
  createdAt: Date;
  updatedAt: Date;
  editor: EditorDocument;
};

const StepSchema = new Schema<StepDocument>({
  number: {
    type: Number,
  },
  content: {
    type: String,
  },
});

const EditorSchema = new Schema({
  background: { type: String },
  radius: { type: String },
  language: { type: String },
  theme: { type: String },
  extensions: { type: String },
});

const SceneSchema = new Schema<SceneDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
    },
    public: {
      type: Boolean,
      default: false,
    },
    steps: {
      type: [StepSchema],
    },
    editor: {
      type: EditorSchema,
    },
  },
  {
    timestamps: true,
  }
);

SceneSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

export const Scene = mongoose.model("Scene", SceneSchema);
