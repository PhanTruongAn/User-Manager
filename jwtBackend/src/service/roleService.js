import { raw } from "body-parser";
import db from "../models";
import _ from "lodash";
import { Op, where } from "sequelize";
const Role = db.Role;
// Create roles
const createRole = async (roles) => {
  try {
    const testArr = roles;
    // console.log("Check data:", testArr);
    const currentRoles = await Role.findAll({
      attributes: ["url", "description"],
      raw: true,
    });

    const persists = testArr.filter(
      ({ url: url1 }) => !currentRoles.some(({ url: url2 }) => url1 === url2)
    );
    if (persists.length === 0) {
      return {
        EC: 0,
        message: "Nothing to create...",
      };
    }
    const results = await Role.bulkCreate(persists);
    if (results) {
      return {
        EC: 0,
        message: `Create ${persists.length} roles successfully!`,
      };
    }
  } catch (error) {
    console.log(error);
    return {
      EC: 1,
      EM: "Error from server service!",
      DT: null,
    };
  }
};
//Get all role
const getAllRole = async () => {
  const data = await Role.findAll({
    attributes: ["id", "url", "description"],
  });
  if (data) {
    return {
      EC: 0,
      message: "Get all role successfully!0",
      DT: data,
    };
  } else {
    return {
      EC: 1,
      EM: "Error from server service!",
      DT: null,
    };
  }
};
const getPaginationRoles = async (page, limit) => {
  try {
    const offset = (page - 1) * limit;
    const { count, rows } = await Role.findAndCountAll({
      attributes: ["id", "url", "description"],
      offset: offset,
      limit: limit,
    });
    const totalPages = Math.ceil(count / limit);
    const data = {
      totalRows: count,
      totalPages: totalPages,
      roles: rows,
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
// Delete role
const deleteRole = async (data) => {
  const res = await Role.destroy({
    where: { id: data.id },
  });
  if (res) {
    return {
      EC: 0,
    };
  } else {
    return {
      EC: 1,
      EM: "Delete user fail!",
    };
  }
};
//Update role
const updateRole = async (data) => {
  const res = await Role.update(
    {
      url: data.url,
      description: data.description,
    },
    { where: { id: data.id } }
  );
  if (res) {
    return {
      EC: 0,
      DT: res,
      message: "Update role success!",
    };
  } else {
    return {
      EC: 1,
      DT: res,
      message: "Update role fail!",
    };
  }
};
module.exports = {
  createRole,
  getAllRole,
  deleteRole,
  updateRole,
  getPaginationRoles,
};
