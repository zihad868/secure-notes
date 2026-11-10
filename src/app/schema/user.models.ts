import { Schema, model } from "mongoose";


const userSchema = new Schema({
  name: String,
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  interests: [String],
}, { timestamps: true });
userSchema.index({ interests: 1 });        

export const User = model("Users", userSchema);