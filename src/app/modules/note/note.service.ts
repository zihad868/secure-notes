import { Note } from "../../../schema/note.models";
import { INotePayload, IUpdateNotePayload } from "./note.interface";

const createNote = async (userId: string, payload: INotePayload) => Note.create({ ...payload, owner: userId });

const getNotes = async (filter: Record<string, unknown>, skip: number, limit: number) => {
  const [notes, total] = await Promise.all([
    Note.find(filter).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
    Note.countDocuments(filter),
  ]);
  return {  total, notes };
};

const getSingleNote = async (userId: string, noteId: string) => {
  const note = await Note.findOne({ _id: noteId, owner: userId, isDeleted: false }).lean();
  if (!note) throw new Error("Note not found.");
  return note;
};

const updateNote = async (userId: string, noteId: string, payload: IUpdateNotePayload) => {
  const note = await Note.findOneAndUpdate({ _id: noteId, owner: userId, isDeleted: false }, { $set: payload }, { new: true, runValidators: true }).lean();
  if (!note) throw new Error("Note not found or you are not authorized to update it.");
  return note;
};

const deleteNote = async (userId: string, noteId: string) => {
  const note = await Note.findOneAndUpdate({ _id: noteId, owner: userId, isDeleted: false }, { $set: { isDeleted: true } }, { new: true }).lean();
  if (!note) throw new Error("Note not found or already deleted.");
  return note;
};

export const NoteService = { 
  createNote, 
  getNotes, 
  getSingleNote, 
  updateNote, 
  deleteNote 
};
