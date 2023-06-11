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

const urlControllers = {
  createUrl,
};

export default urlControllers;
