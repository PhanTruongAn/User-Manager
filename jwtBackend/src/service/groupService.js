import db from "../models/index";
import { Op, where } from "sequelize";
import _ from "lodash";
const Group = db.Group;

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
module.exports = {
  getAllGroup,
};
