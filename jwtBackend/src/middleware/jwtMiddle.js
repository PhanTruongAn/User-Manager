require("dotenv").config();
import jwtAction from "./jwtAction";
//Non-secure path
const white_list = ["/", "/register", "/login", "/log-out"];

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
      if (!cookie.jwt || !tokenFromHeader) {
        return res.status(401).json({
          EC: 1,
          EM: "Unauthorized!",
        });
      } else {
        const token = cookie.jwt ? cookie.jwt : tokenFromHeader;
        const isVerify = jwtAction.verifyToken(token);
        if (isVerify) {
          req.user = isVerify;
          req.token = token;
          next();
        } else {
          return res.status(401).json({
            EC: 1,
            EM: "Token invalid or expired!",
          });
        }
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
    const userAdmin = req.user.groupWithRoles.name;
    const canAccess = roles.some(
      (item) => item.url === currentUrl || currentUrl.includes(item.url)
    );
    if (canAccess === true || userAdmin === "ADMIN") {
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
