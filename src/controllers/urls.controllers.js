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

const urlControllers = {
  createUrl,
  redirectToUrl,
};

export default urlControllers;
