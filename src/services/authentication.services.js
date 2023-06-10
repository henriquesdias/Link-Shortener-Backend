import authenticationRepositories from "../repositories/authentication.repositories.js";

import bcrypt from "bcrypt";

async function signUp(email, password) {
  const user = await authenticationRepositories.getUserByEmail(email);
  if (user.rowCount !== 0) {
    throw { name: "conflict", message: "This email already in use" };
  }
  const hash = bcrypt.hashSync(password, 10);
  return authenticationRepositories.signUp(email, hash);
}

const authenticationServices = {
  signUp,
};

export default authenticationServices;
