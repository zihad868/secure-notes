import { Schema, model } from "mongoose";


const userSchema = new Schema({
  name: { type: String, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  interests: { type: [String], default: [] },
}, { timestamps: true });

// Supports profile/login lookups, admin pagination, and the interests aggregation.
userSchema.index({ interests: 1 });
userSchema.index({ createdAt: -1, _id: -1 });

export const User = model("Users", userSchema);
