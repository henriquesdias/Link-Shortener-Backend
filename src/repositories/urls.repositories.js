import connection from "../database/config.js";

async function createUrl({ url, user_id, shortened_url }) {
  return connection.query(
    `INSERT INTO urls (url, "shortened_url","user_id") VALUES ($1,$2,$3) RETURNING *;`,
    [url, shortened_url, user_id]
  );
}
async function getShortenedUrl(shortened_url) {
  return connection.query(`SELECT * FROM urls WHERE "shortened_url" = $1`, [
    shortened_url,
  ]);
}

const urlsRepositories = {
  createUrl,
  getShortenedUrl,
};

export default urlsRepositories;
