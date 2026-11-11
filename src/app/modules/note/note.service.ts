import { Note } from "../../../schema/note.models";
import { INotePayload, IUpdateNotePayload } from "./note.interface";

const createNote = async (userId: string, payload: INotePayload) => {
  const newNote = await Note.create({
    title: payload.title,
    content: payload.content ?? "",
    owner: userId,
  });

  return newNote;
};

const getUserNotes = async (userId: string) => {

  const notes = await Note.find({ owner: userId, isDeleted: false }).sort({ _id: -1 });
  
  return notes;
};

const getSingleNote = async (userId: string, noteId: string) => {
  const note = await Note.findOne({ _id: noteId, owner: userId, isDeleted: false });
  
  if (!note) {
    throw new Error("Note not found.");
  }
  
  return note;
};

const updateNote = async (
  userId: string,
  noteId: string,
  payload: IUpdateNotePayload
) => {
  const updatedNote = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId, isDeleted: false },
    { $set: payload },
    { returnDocument: "after", runValidators: true }
  );

  if (!updatedNote) {
    throw new Error("Note not found or you are not authorized to update it.");
  }

  return updatedNote;
};

const deleteNote = async (userId: string, noteId: string) => {

  const deletedNote = await Note.findOneAndUpdate(
    { _id: noteId, owner: userId, isDeleted: false },
    { isDeleted: true },
    { returnDocument: "after" }
  );

  if (!deletedNote) {
    throw new Error("Note not found or already deleted.");
  }

  return deletedNote;
};

export const NoteService = {
  createNote,
  getUserNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};

