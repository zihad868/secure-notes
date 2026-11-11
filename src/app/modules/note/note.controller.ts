import { Request, Response, NextFunction } from "express";
import { NoteService } from "./note.service";
import { createNoteSchema, updateNoteSchema } from "./note.validation";

const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const parsed = createNoteSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const note = await NoteService.createNote(userId, parsed.data.body);

    res.status(201).json({
      success: true,
      message: "Note created successfully.",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const getUserNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const notes = await NoteService.getUserNotes(userId);

    res.status(200).json({
      success: true,
      message: "Notes fetched successfully.",
      total: notes.length,
      data: notes,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const note = await NoteService.getSingleNote(userId, id as string);

    res.status(200).json({
      success: true,
      message: "Note fetched successfully.",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const parsed = updateNoteSchema.safeParse({ body: req.body });
    if (!parsed.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: parsed.error.flatten().fieldErrors,
      });
      return;
    }

    const updatedNote = await NoteService.updateNote(
      userId,
      id as string,
      parsed.data.body
    );

    res.status(200).json({
      success: true,
      message: "Note updated successfully.",
      data: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) {
      res.status(401).json({
        success: false,
        message: "Unauthorized! User context not found.",
      });
      return;
    }

    const deletedNote = await NoteService.deleteNote(userId, id as string);

    res.status(200).json({
      success: true,
      message: "Note deleted successfully.",
      data: deletedNote,
    });
  } catch (error) {
    next(error);
  }
};

export const NoteController = {
  createNote,
  getUserNotes,
  getSingleNote,
  updateNote,
  deleteNote,
};

