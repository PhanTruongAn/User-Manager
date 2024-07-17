import bcrypt from "bcryptjs";
import db from "../models/index";
import { Op, where } from "sequelize";
import _ from "lodash";
import userValidate from "../validates/userValidate";
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;
const jwt_expire = process.env.JWT_EXPIRE;
let salt = bcrypt.genSaltSync(10);
const hashPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};
const registerUser = async (dataUser) => {
  try {
    const validData = await userValidate.checkRegister(dataUser);
    if (validData.EC === 1) {
      return validData;
    } else {
      const hashPass = hashPassword(dataUser.password);
      const newUser = await db.User.create({
        email: dataUser.email,
        password: hashPass,
        username: dataUser.username,
        phone: dataUser.phone,
      });
      if (newUser) {
        return {
          EC: 0,
        };
      } else {
        return {
          EM: "Register fail!",
          EC: 2,
          DT: null,
        };
      }
    }
  } catch (error) {
    console.log(error);
    return {
      EM: "Error from server!",
      EC: 2,
      DT: null,
    };
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
      [Op.or]: [{ email: userName }, { phone: userName }],
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
        phone: userFounded.phone,
      };
      const access_token = jwt.sign(payload, jwt_secret, {
        expiresIn: jwt_expire,
      });
      return {
        EC: 0,
        DT: _.pick(userFounded, ["email", "username", "phone", "groupId"]),
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
    EM: "Your phone or email is not exist!",
    EC: 1,
    DT: null,
  };
};
module.exports = {
  registerUser,
  getUserList,
  deleteUser,
  editUser,
  updateUser,
  loginUser,
};
