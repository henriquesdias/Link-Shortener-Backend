import urlsRepositories from "../repositories/urls.repositories.js";

import { customAlphabet } from "nanoid";

async function createUrl(url, user_id) {
  const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 10);
  const shortened_url = nanoid(9);
  const newUrl = await urlsRepositories.createUrl({
    url,
    user_id,
    shortened_url,
  });
  return newUrl.rows[0];
}
async function getShortenedUrl(shortened_url) {
  const url = await urlsRepositories.getShortenedUrl(shortened_url);
  if (url.rowCount === 0) {
    throw { name: "notFound", message: "This url do not exists" };
  }
  await urlsRepositories.newVisit(url.rows[0].id);
  return url.rows[0].url;
}
async function getTheTop100MostVisited() {
  const urls = await urlsRepositories.getTheTop100MostVisited();
  return urls.rows;
}
async function deleteUrl(id, user_id) {
  const url = await urlsRepositories.getUniqueUrl(id);
  if (url.rowCount === 0) {
    throw { name: "notFound", message: "This url do not exists" };
  }
  if (url.rows[0].user_id !== user_id) {
    throw {
      name: "unauthorized",
      message: "You dont hava permission to exclude this data",
    };
  }
  await urlsRepositories.deleteUrl(id);
}
async function getPersonalUrls(user_id) {
  if (!user_id) {
    throw { name: "unauthorized", message: "the user_id is invalid" };
  }
  const urls = await urlsRepositories.getPersonalUrls(user_id);
  return urls.rows;
}

const urlsServices = {
  createUrl,
  getShortenedUrl,
  getTheTop100MostVisited,
  deleteUrl,
  getPersonalUrls,
};

export default urlsServices;
