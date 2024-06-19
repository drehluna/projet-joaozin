import { Router } from "express";

import {
  getUsers,
  createUser,
  deleteUser,
  login,
  authenticate,
  getMyProfile,
} from "./controllers/UserController.js";

const routes = Router();

routes.get("/users", getUsers);
routes.post("/users", createUser);
routes.post("/users/login", login);
routes.delete("/users/:id", deleteUser);
routes.get("/me", authenticate, getMyProfile);

export default routes;
