import axiosClient from "./axiosClient";
const baseUrl = "/group";
const groupApi = {
  getAllGroup: () => {
    return axiosClient.get(baseUrl + "/get-all-group");
  },
};
export default groupApi;
