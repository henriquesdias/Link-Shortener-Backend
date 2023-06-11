import jwt from "jsonwebtoken";

async function validateToken(req, res, next) {
  const { authorization } = req.headers;
  const receivedToken = authorization?.replace("Bearer ", "");
  if (!receivedToken) {
    res.locals.user_id = null;
    next();
    return;
  }
  try {
    const token = jwt.verify(receivedToken, process.env.JWT_SECRET);
    res.locals.user_id = token.user_id;
    next();
  } catch (error) {
    res.sendStatus(401);
  }
}

export default validateToken;
