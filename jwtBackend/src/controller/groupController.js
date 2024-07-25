import groupService from "../service/groupService";

const handlerGetAllGroup = async (req, res) => {
  try {
    const data = await groupService.getAllGroup();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EC: 1,
      EM: "Error from server",
    });
  }
};
module.exports = {
  handlerGetAllGroup,
};
