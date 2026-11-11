import { Types } from "mongoose";

export interface INotePayload {
  title: string;
  content?: string;
}

export interface IUpdateNotePayload {
  title?: string;
  content?: string;
  isCompleted?: boolean;
}

