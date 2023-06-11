import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authenticationRouters from "./routes/authentication.routes.js";
import urlRouters from "./routes/urls.routes.js";

const variables = dotenv.config({ path: "./.env.development" });
process.env = {
  ...variables.parsed,
};

const server = express();

server.use(express.json());
server.use(cors());
server.use(authenticationRouters);
server.use(urlRouters);

server.listen(process.env.PORT, () =>
  // eslint-disable-next-line
  console.log(`Listening on port ${process.env.PORT}`)
);
