import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import noteRoutes from "../modules/note/note.routes";
import postRoutes from "../modules/post/post.routes";

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
  {
    path: "/posts",
    route: postRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
