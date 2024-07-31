import axiosClient from "./axiosClient";
const baseUrl = "/role";

const roleApi = {
  createRole: (data) => {
    return axiosClient.post(baseUrl + "/create", data);
  },
  getAllRole: (page, limit) => {
    return axiosClient.get(`${baseUrl}/get-all?page=${page}&limit=${limit}`);
  },
  updateRole: (data) => {
    return axiosClient.put(baseUrl + "/update", data);
  },
  deleteRole: (data) => {
    return axiosClient.delete(baseUrl + "/delete", { data });
  },
};
export default roleApi;
