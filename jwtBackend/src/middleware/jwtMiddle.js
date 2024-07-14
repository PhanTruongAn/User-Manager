require("dotenv").config();
const jwt = require("jsonwebtoken");

const jwtMiddle = (req, res, next) => {
  const white_lists = ["/", "/register", "/login"];
  if (white_lists.find((item) => "/user" + item === req.originalUrl)) {
    next();
  } else {
    setTimeout(() => {
      if (req?.headers?.authorization?.split(" ")?.[1]) {
        const token = req.headers.authorization.split(" ")[1];
        // console.log(">>>>>Check Token: ", token);

        // Verify token
        try {
          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          // console.log("Decoded data: ", decoded);
          next();
        } catch (error) {
          return res.status(401).json({
            EC: 1,
            EM: "Token invalid or expired!",
          });
        }
      } else {
        return res.status(401).json({
          EC: 1,
          EM: "Unauthorized!",
        });
      }
    }, 2000);
  }
};
module.exports = jwtMiddle;
