import urlsServices from "../services/urls.services.js";

async function createUrl(req, res) {
  try {
    const { url } = res.locals.body;
    const { user_id } = res.locals;
    const shortened_url = await urlsServices.createUrl(url, user_id);
    res.status(201).send(shortened_url);
  } catch (error) {
    res.sendStatus(400);
  }
}
async function redirectToUrl(req, res) {
  const { shortened_url } = req.params;
  try {
    const url = await urlsServices.getShortenedUrl(shortened_url);
    res.status(200).redirect(url);
  } catch (error) {
    if (error.name === "notFound") {
      return res.sendStatus(404);
    }
    res.sendStatus(400);
  }
}
async function getTheTop100MostVisited(req, res) {
  try {
    const urls = await urlsServices.getTheTop100MostVisited();
    res.status(200).send(urls);
  } catch (error) {
    res.sendStatus(400);
  }
}
async function deleteUrl(req, res) {
  const { id } = req.params;
  const { user_id } = res.locals;
  try {
    await urlsServices.deleteUrl(id, user_id);
    res.sendStatus(200);
  } catch (error) {
    if (error.name === "notFound") {
      return res.sendStatus(404);
    }
    if (error.name === "unauthorized") {
      return res.sendStatus(401);
    }
    res.sendStatus(400);
  }
}
async function getPersonalUrls(req, res) {
  const { user_id } = res.locals;
  try {
    const urls = await urlsServices.getPersonalUrls(user_id);
    res.status(200).send(urls);
  } catch (error) {
    if (error.name === "unauthorized") {
      return res.sendStatus(401);
    }
    res.sendStatus(400);
  }
}

const urlControllers = {
  createUrl,
  redirectToUrl,
  getTheTop100MostVisited,
  deleteUrl,
  getPersonalUrls,
};

export default urlControllers;
