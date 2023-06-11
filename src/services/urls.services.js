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

const urlsServices = {
  createUrl,
};

export default urlsServices;
