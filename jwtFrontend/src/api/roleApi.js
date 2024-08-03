import axiosClient from "./axiosClient";
const baseUrl = "/role";

const roleApi = {
  createRole: (data) => {
    return axiosClient.post(baseUrl + "/create", data);
  },
  getAllRole: (page, limit) => {
    const url =
      page && limit
        ? `${baseUrl}/get-all?page=${page}&limit=${limit}`
        : `${baseUrl}/get-all`;
    return axiosClient.get(url);
  },
  updateRole: (data) => {
    return axiosClient.put(baseUrl + "/update", data);
  },
  deleteRole: (data) => {
    return axiosClient.delete(baseUrl + "/delete", { data });
  },
  assignRoleToGroup: (data) => {
    return axiosClient.post(baseUrl + "/assign-to-group", data);
  },
};
export default roleApi;
