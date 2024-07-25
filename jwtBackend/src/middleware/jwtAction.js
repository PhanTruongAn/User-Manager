require("dotenv").config;
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const jwt_expire = process.env.JWT_EXPIRE;
// Generate Token
const createToken = (payload) => {
  try {
    const token = jwt.sign(payload, jwt_secret, {
      expiresIn: jwt_expire,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
// Decode Token
const decodeToken = (token) => {
  try {
    const data = jwt.decode(token);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// Verify Token
const verifyToken = (token) => {
  try {
    const isVerified = jwt.verify(token, jwt_secret);
    return isVerified;
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  createToken,
  decodeToken,
  verifyToken,
};
