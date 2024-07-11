require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtMiddle = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(">>>>>Check Token: ", token);
  next();
};
module.exports = jwtMiddle;
