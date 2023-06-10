import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const variables = dotenv.config({ path: "./.env.development" });
process.env = {
  ...variables.parsed,
};

const server = express();

server.use(express.json());
server.use(cors());

server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
