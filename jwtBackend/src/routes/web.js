import express from "express";
import homeController from "../controller/homeController";
import groupController from "../controller/groupController";
import { jwtMiddle, checkUserPermission } from "../middleware/jwtMiddle";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  // middleware check token for all api
  router.all("*", jwtMiddle, checkUserPermission);

  // Non-secure api
  router.post("/register", homeController.handlerRegister);
  router.post("/login", homeController.handlerLoginUser);

  // User
  router.get("/user/get-all", homeController.handlerUserPage);
  router.delete("/user/delete", homeController.handlerDeleteUser);
  router.put("/user/update", homeController.handlerUpdateUser);
  router.post("/fetch-token", homeController.handlerGetDataFromToken);
  router.post("/user/create", homeController.handlerCreateUser);

  //Group
  router.get("/group/get-all-group", groupController.handlerGetAllGroup);
  return app.use("/", router);
};
export default initWebRoutes;
