import express from "express";
import homeController from "../controller/homeController";
import groupController from "../controller/groupController";
import jwtMiddle from "../middleware/jwtMiddle";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  router.all("*", jwtMiddle);

  // User
  router.get("/", homeController.handlerHelloWorld);
  router.get("/user/get-all", homeController.handlerUserPage);
  router.post("/user/register", homeController.handlerRegister);
  router.delete("/user/delete/:id", homeController.handlerDeleteUser);
  // router.put("/user/edit-user/:id", homeController.handlerEditUser);
  router.put("/user/update", homeController.handlerUpdateUser);
  router.post("/user/login", homeController.handlerLoginUser);
  router.post("/user/fetch-token", homeController.handlerGetDataFromToken);
  router.post("/user/create", homeController.handlerCreateUser);
  //Group
  router.get("/get-all-group", groupController.handlerGetAllGroup);
  return app.use("/", router);
};
export default initWebRoutes;
