import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import noteRoutes from "../modules/note/note.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/notes",
    route: noteRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
