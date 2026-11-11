import { Schema, model } from "mongoose";


const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  owner: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  isCompleted: { type: Boolean, default: false },
  isDeleted: { type: Boolean, default: false },
}, { timestamps: true });

noteSchema.index({ owner: 1, isDeleted: 1, _id: -1 });

export const Note = model("notes", noteSchema);
