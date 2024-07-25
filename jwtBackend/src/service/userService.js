import bcrypt from "bcryptjs";
import db from "../models/index";
import { Op, where } from "sequelize";
import _ from "lodash";
import userValidate from "../validates/userValidate";
import jwtAction from "../middleware/jwtAction";
import authenticationService from "./authenticationService";
let salt = bcrypt.genSaltSync(10);

//models db
const User = db.User;
const Group = db.Group;

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
      const hashPass = hashPassword(
        dataUser.password ? dataUser.password : "1"
      );
      const newUser = await User.create({
        email: dataUser.email,
        password: hashPass,
        username: dataUser.username,
        phone: dataUser.phone,
        groupId: dataUser.groupId ? dataUser.groupId : 4,
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

const createUser = async (data) => {
  try {
    const checkValid = await userValidate.checkCreateUser(data);
    if (checkValid.EC === 1) {
      return checkValid;
    } else {
      const hashPass = hashPassword(data.password);
      const user = await User.create({
        ...data,
        password: hashPass,
        groupId: data.role,
      });
      if (user) {
        return {
          EC: 0,
          message: "Create user success!",
        };
      } else {
        return {
          EC: 1,
          DT: null,
          EM: "Create user fail!",
        };
      }
    }
  } catch (error) {
    return {
      EC: 1,
      DT: null,
      EM: "Error from server!",
    };
  }
};

const getUserList = async () => {
  const users = await User.findAll({
    attributes: ["id", "username", "email", "phone", "sex", "address"],
    include: {
      model: Group,
      // attributes: ["name", "description"], // Specify the attributes you want to retrieve
    },
  });
  return {
    EC: 0,
    DT: users,
  };
};

const getPaginationUsers = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await User.findAndCountAll({
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: {
        model: Group,
        attributes: ["id", "name", "description"],
      },
      offset: offset,
      limit: limit,
    });
    const totalPages = Math.ceil(count / limit);
    const data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Error from server!",
      DT: null,
    };
  }
};

const deleteUser = async (userId) => {
  const res = await User.destroy({
    where: { id: userId },
  });
  if (res) {
    return {
      EC: 0,
      message: "Delete user success!",
    };
  } else {
    return {
      EC: 1,
      message: "Delete user fail!",
    };
  }
};
const editUser = async (id) => {
  let user = {};
  user = await User.findOne({
    where: { id: id },
  });
  return user;
};
const updateUser = async (data) => {
  const res = await User.update(
    {
      email: data.email,
      phone: data.phone,
      username: data.username,
      sex: data.sex,
      address: data.address,
      groupId: data.groupId,
    },
    { where: { id: data.id } }
  );
  if (res) {
    return {
      EC: 0,
      DT: res,
      message: "Update user success!",
    };
  } else {
    return {
      EC: 1,
      DT: res,
      message: "Update user fail!",
    };
  }
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
  let userFounded = await User.findOne({
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
      const access_token = jwtAction.createToken(payload);

      return {
        EC: 0,
        DT: access_token,
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
const getDataFromToken = async (data) => {
  const token = data.token;
  const decodeToken = jwtAction.decodeToken(token);
  const user = await User.findOne({ where: { email: decodeToken.email } });
  const roles = await authenticationService.getRoleWithGroupId(user);

  if (user) {
    const userDTO = {
      ..._.pick(user, ["email", "username", "phone", "groupId"]),
      groupWithRoles: roles,
    };
    return {
      EC: 0,
      DT: userDTO,
    };
  } else {
    return {
      EC: 1,
      EM: "Token invalid or expired!",
    };
  }
};
module.exports = {
  registerUser,
  createUser,
  getUserList,
  getPaginationUsers,
  deleteUser,
  editUser,
  updateUser,
  loginUser,
  getDataFromToken,
};
