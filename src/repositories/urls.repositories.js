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
async function newVisit(id) {
  return connection.query(`INSERT INTO visits ("visited_url") VALUES ($1)`, [
    id,
  ]);
}
async function getTheTop100MostVisited() {
  return connection.query(`SELECT urls.*, COUNT(visits.visited_url) AS num_visits
  FROM urls
  LEFT JOIN visits ON urls.id = visits.visited_url
  GROUP BY urls.id
  ORDER BY num_visits DESC
  LIMIT 100;`);
}

const urlsRepositories = {
  createUrl,
  getShortenedUrl,
  newVisit,
  getTheTop100MostVisited,
};

export default urlsRepositories;
