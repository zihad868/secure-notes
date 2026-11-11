import { Router } from "express";
import { NoteController } from "./note.controller";
import { auth } from "../../middlewares/auth";

const router = Router();

router.use(auth());

router.post("/", NoteController.createNote);

router.get("/", NoteController.getUserNotes);

router.get("/:id", NoteController.getSingleNote);


router.patch("/:id", NoteController.updateNote);

router.delete("/:id", NoteController.deleteNote);

export default router;

