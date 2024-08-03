import roleService from "../service/roleService";
import _ from "lodash";

const handlerGetAll = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = req.query.page;
      const limit = req.query.limit;
      const data = await roleService.getPaginationRoles(+page, +limit);
      return res.status(200).json(data);
    } else {
      const data = await roleService.getAllRole();
      return res.status(200).json(data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: 1,
      EM: "Error from server",
      DT: null,
    });
  }
};
const handlerCreate = async (req, res) => {
  try {
    const data = await roleService.createRole(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: 1,
      EM: "Error from server",
      DT: null,
    });
  }
};
const handlerUpdate = async (req, res) => {
  try {
    const data = await roleService.updateRole(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: 1,
      EM: "Error from server",
      DT: null,
    });
  }
};
const handlerDelete = async (req, res) => {
  try {
    const data = await roleService.deleteRole(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: 1,
      EM: "Error from server",
      DT: null,
    });
  }
};
const handlerAssignRoleToGroup = async (req, res) => {
  try {
    const data = await roleService.assignRoleToGroup(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: 1,
      EM: "Error from server",
      DT: null,
    });
  }
};
module.exports = {
  handlerGetAll,
  handlerCreate,
  handlerUpdate,
  handlerDelete,
  handlerAssignRoleToGroup,
};
