import db from "../models/index";
import { Op, where } from "sequelize";
import _ from "lodash";
require("dotenv").config;
const Group = db.Group;
const Role = db.Role;
const getRoleWithGroupId = async (user) => {
  try {
    const group = await Group.findOne({
      where: { id: user.groupId },
      attributes: ["id", "name", "description"],
      include: {
        model: Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    if (group) {
      return group;
    } else {
      return {
        EC: 1,
        DT: null,
        EM: "Get role fail!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      DT: null,
      EM: "Error from server!",
    };
  }
};

const getAllGroup = async () => {
  const data = await Group.findAll();
  if (data) {
    return {
      EC: 0,
      DT: data,
    };
  } else {
    return {
      EC: 1,
      EM: "Get all Group fail!",
      DT: null,
    };
  }
};

const rolesByGroup = async (groupId) => {
  try {
    const group = await Group.findOne({
      where: { id: groupId },
      attributes: ["id", "name", "description"],
      include: {
        model: Role,
        attributes: ["id", "url", "description"],
        through: { attributes: [] },
      },
    });
    if (group) {
      return {
        EC: 0,
        DT: group,
      };
    } else {
      return {
        EC: 1,
        DT: null,
        EM: "Get roles fail!",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      EC: 1,
      DT: null,
      EM: "Error from server!",
    };
  }
};
module.exports = {
  getAllGroup,
  getRoleWithGroupId,
  rolesByGroup,
};
