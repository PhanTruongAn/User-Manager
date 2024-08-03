import axiosClient from "./axiosClient";
const baseUrl = "/group";
const groupApi = {
  getAllGroup: () => {
    return axiosClient.get(baseUrl + "/get-all-group");
  },
  getRoleByGroup: (id) => {
    return axiosClient.get(baseUrl + `/roles-by-group-id/${id}`);
  },
};
export default groupApi;
