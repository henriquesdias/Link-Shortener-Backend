import connection from "../database/config.js";

async function createUrl({ url, user_id, shortened_url }) {
  return connection.query(
    `INSERT INTO urls (url, "shortened_url","user_id") VALUES ($1,$2,$3) RETURNING *;`,
    [url, shortened_url, user_id]
  );
}
async function getShortenedUrl(shortened_url) {
  return connection.query(`SELECT * FROM urls WHERE "shortened_url" = $1;`, [
    shortened_url,
  ]);
}
async function newVisit(id) {
  return connection.query(
    `INSERT INTO visits ("visited_url_id") VALUES ($1);`,
    [id]
  );
}
async function getTheTop100MostVisited() {
  return connection.query(`SELECT
  u.url,
  SUM(v.visit_count) AS num_visits
FROM
  urls u
JOIN (
  SELECT
    visited_url_id,
    COUNT(*) AS visit_count
  FROM
    visits
  GROUP BY
    visited_url_id
) v ON u.id = v.visited_url_id
GROUP BY
  u.url
ORDER BY
  num_visits DESC
LIMIT
  100;`);
}
async function getUniqueUrl(id) {
  return connection.query(`SELECT * FROM urls WHERE id = $1;`, [id]);
}
async function deleteUrl(id) {
  await connection.query(`DELETE FROM visits WHERE "visited_url_id" = $1;`, [
    id,
  ]);
  return connection.query(`DELETE FROM urls WHERE id = $1;`, [id]);
}

const urlsRepositories = {
  createUrl,
  getShortenedUrl,
  newVisit,
  getTheTop100MostVisited,
  getUniqueUrl,
  deleteUrl,
};

export default urlsRepositories;
