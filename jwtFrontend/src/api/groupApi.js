import axiosClient from "./axiosClient";
const groupApi = {
  getAllGroup: () => {
    const url = "/group/get-all-group";
    return axiosClient.get(url);
  },
};
export default groupApi;
