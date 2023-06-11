import authenticationRepositories from "../repositories/authentication.repositories.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function signUp(email, password) {
  const user = await authenticationRepositories.getUserByEmail(email);
  if (user.rowCount !== 0) {
    throw { name: "conflict", message: "This email already in use" };
  }
  const hash = bcrypt.hashSync(password, 10);
  return authenticationRepositories.signUp(email, hash);
}
async function signIn(email, password) {
  const user = await authenticationRepositories.getUserByEmail(email);
  if (
    user.rowCount !== 0 &&
    bcrypt.compareSync(password, user.rows[0].password)
  ) {
    const token = jwt.sign(
      {
        userId: user.rows[0].id,
      },
      // eslint-disable-next-line
      process.env.JWT_SECRET
    );
    return token;
  }
  throw { name: "unauthorized", message: "The credentials are wrong" };
}

const authenticationServices = {
  signUp,
  signIn,
};

export default authenticationServices;
