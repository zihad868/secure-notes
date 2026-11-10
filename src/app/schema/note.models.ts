import { Schema, model } from "mongoose";


const noteSchema = new Schema({
  title: String, content: String,
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });


    

export const Note = model("notes", noteSchema);