import connection from "./database/config.js";

async function createTables() {
  await connection.query(`CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(250) NOT NULL,
    created_at DATE DEFAULT NOW() NOT NULL
  );`);
  await connection.query(
    `  CREATE TABLE urls (
      id SERIAL PRIMARY KEY,
      url VARCHAR(100) NOT NULL,
      "shortened_url" VARCHAR(100) NOT NULL,
      "user_id" INTEGER REFERENCES "users"("id"),
      "created_at" DATE DEFAULT NOW() NOT NULL
    );`
  );
  await connection.query(`  CREATE TABLE visits (
    id SERIAL PRIMARY KEY,
    "visited_url" INTEGER NOT NULL REFERENCES "urls"("id"),
    "created_at" DATE DEFAULT NOW() NOT NULL
  );`);
}

createTables()
  .then(() => {
    // eslint-disable-next-line
    console.log("Tables created successfully.");
  })
  .catch((error) => {
    // eslint-disable-next-line
    console.log(error);
  });
