import { Router } from "express";

import authenticationController from "../controllers/authentication.controller.js";
import validateBody from "../middlewares/validate.body.js";
import authenticationSchemas from "../schemas/authentication.schemas.js";

const authenticationRouters = Router();
authenticationRouters.post(
  "/users",
  validateBody(authenticationSchemas.signUp),
  authenticationController.signUp
);

export default authenticationRouters;
