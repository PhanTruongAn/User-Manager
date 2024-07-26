require("dotenv").config();
import jwtAction from "./jwtAction";
//Non-secure path
const white_list = ["/", "/register", "/login"];

const extractToken = (req) => {
  if (req?.headers?.authorization?.split(" ")?.[1]) {
    return req.headers.authorization.split(" ")[1];
  }
  return null;
};

const jwtMiddle = (req, res, next) => {
  if (white_list.includes(req.path)) {
    return next();
  } else {
    setTimeout(() => {
      const cookie = req.cookies;
      const tokenFromHeader = extractToken(req);
      if ((cookie && cookie.jwt) || tokenFromHeader) {
        const token = cookie.jwt ? cookie.jwt : tokenFromHeader;
        const isVerify = jwtAction.verifyToken(token);
        if (isVerify) {
          req.user = isVerify;
          next();
        } else {
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

const checkUserPermission = (req, res, next) => {
  if (white_list.includes(req.path) || req.path === "/fetch-token")
    return next();
  if (req.user) {
    const roles = req.user.groupWithRoles.Roles;
    const currentUrl = req.path;

    const canAccess = roles.some((item) => item.url === currentUrl);
    if (canAccess === true) {
      next();
    } else {
      return res.status(403).json({
        EC: -1,
        DT: null,
        EM: "You don't have permission to access this resource!",
      });
    }
  } else {
    console.log("Unauthorized");
    return res.status(401).json({
      EC: 1,
      DT: null,
      EM: "Unauthorized",
    });
  }
};
module.exports = { jwtMiddle, checkUserPermission };
