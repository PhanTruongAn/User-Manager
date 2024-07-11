import express from "express";
import homeController from "../controller/homeController";
import jwtMiddle from "../middleware/jwtMiddle";
const router = express.Router();
/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  router.all("*", jwtMiddle);
  router.get("/", homeController.handlerHelloWorld);
  router.get("/user/get-all", homeController.handlerUserPage);
  router.post("/user/create-user", homeController.handlerCreateNewUser);
  router.post("/user/delete-user/:id", homeController.handlerDeleteUser);
  router.get("/user/edit-user/:id", homeController.handlerEditUser);
  router.post("/user/edit-user", homeController.handlerUpdateUser);
  router.post("/user/login", homeController.handlerLoginUser);
  return app.use("/", router);
};
export default initWebRoutes;
