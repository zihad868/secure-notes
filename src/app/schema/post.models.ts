import { Schema, model } from "mongoose";


const postSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

postSchema.index({ author: 1, _id: -1 });

export const Post = model("posts", postSchema);