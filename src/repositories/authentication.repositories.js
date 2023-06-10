import connection from "../database/config.js";

async function signUp(email, password) {
  return connection.query("INSERT INTO users (email,password) VALUES ($1,$2)", [
    email,
    password,
  ]);
}
async function getUserByEmail(email) {
  return connection.query("SELECT * FROM users WHERE email = $1", [email]);
}

const authenticationRepositories = {
  signUp,
  getUserByEmail,
};

export default authenticationRepositories;
