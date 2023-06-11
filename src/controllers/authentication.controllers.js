import authenticationServices from "../services/authentication.services.js";

async function signUp(req, res) {
  try {
    const { email, password } = res.locals.body;
    await authenticationServices.signUp(email, password);
    res.sendStatus(201);
  } catch (error) {
    if (error.name === "conflict") {
      return res.sendStatus(409);
    }
    res.sendStatus(400);
  }
}
async function signIn(req, res) {
  try {
    const { email, password } = res.locals.body;
    const token = await authenticationServices.signIn(email, password);
    res.status(200).send({ token });
  } catch (error) {
    if (error.name === "unauthorized") {
      return res.sendStatus(401);
    }
    res.sendStatus(400);
  }
}

const authenticationController = {
  signUp,
  signIn,
};

export default authenticationController;
