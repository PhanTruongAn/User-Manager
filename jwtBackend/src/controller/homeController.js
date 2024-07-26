import userService from "../service/userService";
import _ from "lodash";
const handlerHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handlerUserPage = async (req, res) => {
  if (req.query.page && req.query.limit) {
    let limit = req.query.limit;
    let page = req.query.page;
    const data = await userService.getPaginationUsers(+page, +limit);
    return res.status(200).json(data);
  } else {
    let data = await userService.getUserList();
    return res.status(200).json(data);
  }
};

const handlerRegister = async (req, res) => {
  let data = await userService.registerUser(req.body);
  return res.status(200).json(data);
};
const handlerDeleteUser = async (req, res) => {
  try {
    const data = await userService.deleteUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};
const handlerUpdateUser = async (req, res) => {
  try {
    const data = await userService.updateUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handlerLoginUser = async (req, res) => {
  try {
    let data = await userService.loginUser(req.body);
    if (data && data.DT) {
      res.cookie("jwt", data.DT, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
const handlerGetDataFromToken = async (req, res) => {
  try {
    const user = {
      ..._.pick(req.user, ["email", "username", "phone", "group"]),
    };
    return res.status(200).json({
      EC: 0,
      DT: user,
    });
  } catch (error) {
    console.log(error);
  }
};
const handlerCreateUser = async (req, res) => {
  try {
    const data = await userService.createUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  handlerHelloWorld,
  handlerUserPage,
  handlerRegister,
  handlerCreateUser,
  handlerDeleteUser,
  handlerUpdateUser,
  handlerLoginUser,
  handlerGetDataFromToken,
};
