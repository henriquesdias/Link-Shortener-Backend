import connection from "../database/config.js";

async function createUrl({ url, user_id, shortened_url }) {
  return connection.query(
    `INSERT INTO urls (url, "shortened_url","user_id") VALUES ($1,$2,$3) RETURNING *;`,
    [url, shortened_url, user_id]
  );
}

const urlsRepositories = {
  createUrl,
};

export default urlsRepositories;
