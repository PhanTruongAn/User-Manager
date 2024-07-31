import express from "express";
import homeController from "../controller/homeController";
import groupController from "../controller/groupController";
import roleController from "../controller/roleController";
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
  router.post("/log-out", homeController.handlerLogOut);

  // User Routes
  router.get("/user/get-all", homeController.handlerUserPage);
  router.delete("/user/delete", homeController.handlerDeleteUser);
  router.put("/user/update", homeController.handlerUpdateUser);
  router.get("/fetch-token", homeController.handlerGetDataFromToken);
  router.post("/user/create", homeController.handlerCreateUser);

  //Group Routes
  router.get("/group/get-all-group", groupController.handlerGetAllGroup);

  //Role Routes
  router.get("/role/get-all", roleController.handlerGetAll);
  router.delete("/role/delete", roleController.handlerDelete);
  router.put("/role/update", roleController.handlerUpdate);
  router.post("/role/create", roleController.handlerCreate);
  return app.use("/", router);
};
export default initWebRoutes;
