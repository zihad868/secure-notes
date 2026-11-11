import { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, default: "" },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

postSchema.index({ owner: 1, _id: -1 });

export const Posts = model("posts", postSchema);