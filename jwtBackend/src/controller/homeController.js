import userService from "../service/userService";

const handlerHelloWorld = (req, res) => {
  return res.render("home.ejs");
};

const handlerUserPage = async (req, res) => {
  let data = await userService.getUserList();
  return res.status(200).json(data);
};

const handlerRegister = async (req, res) => {
  let data = await userService.registerUser(req.body);
  return res.status(200).json(data);
};
const handlerDeleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  return res.redirect("/user");
};
const handlerEditUser = async (req, res) => {
  let id = req.params.id;
  let user = await userService.editUser(id);
  let userData = {};
  userData = user;
  return res.render("user-update.ejs", { userData });
};
const handlerUpdateUser = async (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  let username = req.body.username;
  await userService.updateUser(email, username, id);
  return res.redirect("/user");
};
const handlerLoginUser = async (req, res) => {
  try {
    let data = await userService.loginUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  handlerHelloWorld,
  handlerUserPage,
  handlerRegister,
  handlerDeleteUser,
  handlerEditUser,
  handlerUpdateUser,
  handlerLoginUser,
};
