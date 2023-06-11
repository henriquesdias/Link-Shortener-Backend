import dotenv from "dotenv";
import pg from "pg";

const variables = dotenv.config({ path: "./.env.development" });
process.env = {
  ...variables.parsed,
};

const { Pool } = pg;
const databaseConfig = {
  connectionString: `postgresql://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DATABASE}`,
};
const connection = new Pool(databaseConfig);

export default connection;
