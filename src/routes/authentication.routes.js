import { Router } from "express";

import authenticationController from "../controllers/authentication.controllers.js";
import validateBody from "../middlewares/validate.body.js";
import authenticationSchemas from "../schemas/authentication.schemas.js";

const authenticationRouters = Router();

authenticationRouters
  .post(
    "/sign-up",
    validateBody(authenticationSchemas.signUp),
    authenticationController.signUp
  )
  .post(
    "/sign-in",
    validateBody(authenticationSchemas.signIn),
    authenticationController.signIn
  );

export default authenticationRouters;
