import bcrypt from "bcryptjs";
import db from "../models/index";
import { Op, where } from "sequelize";
import _ from "lodash";
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const jwt_expire = process.env.JWT_EXPIRE;
let salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const createNewUser = async (email, password, username) => {
  let hashPass = hashPassword(password);

  try {
    await db.User.create({
      email: email,
      password: hashPass,
      username: username,
    });
  } catch (error) {
    console.log(error);
  }
};
const getUserList = async () => {
  const users = await db.User.findAll({
    attributes: ["id", "email", "username", "groupId"],
  });
  return {
    EC: 0,
    DT: users,
  };
};
const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });
};
const editUser = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user;
};
const updateUser = async (email, username, id) => {
  await db.User.update(
    {
      email: email,
      username: username,
    },
    { where: { id: id } }
  );
};
const loginUser = async (userData) => {
  let userName = userData.userName;
  let userPassword = userData.password;
  if (!userName || !userPassword) {
    return {
      EM: "Please enter all required information!",
      EC: 1,
    };
  }
  let userFounded = await db.User.findOne({
    where: {
      [Op.or]: [{ email: userName }, { username: userName }],
    },
  });
  if (userFounded) {
    let comparePassword = bcrypt.compareSync(
      userPassword,
      userFounded.password
    );
    if (comparePassword) {
      const payload = {
        email: userFounded.email,
        username: userFounded.username,
      };
      const access_token = jwt.sign(payload, jwt_secret, {
        expiresIn: jwt_expire,
      });
      return {
        EC: 0,
        DT: _.pick(userFounded, ["email", "username", "groupId"]),
        access_token: access_token,
      };
    } else {
      return {
        EM: "Wrong password!",
        EC: 1,
      };
    }
  }
  return {
    EM: "Your email or username is not exist!",
    EC: 1,
    DT: null,
  };
};
module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  editUser,
  updateUser,
  loginUser,
};
