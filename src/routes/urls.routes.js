import { Router } from "express";

import validateBody from "../middlewares/validate.body.js";
import urlsSchema from "../schemas/urls.schemas.js";
import urlControllers from "../controllers/urls.controllers.js";
import validateToken from "../middlewares/validate.token.js";

const urlRouters = Router();

urlRouters
  .post(
    "/urls",
    validateToken,
    validateBody(urlsSchema.newUrl),
    urlControllers.createUrl
  )
  .get("/urls/open/:shortened_url", urlControllers.redirectToUrl)
  .get("/urls", urlControllers.getTheTop100MostVisited);

export default urlRouters;
