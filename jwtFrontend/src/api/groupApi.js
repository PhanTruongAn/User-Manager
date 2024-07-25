import axiosClient from "./axiosClient";
const groupApi = {
  getAllGroup: () => {
    const url = "/get-all-group";
    return axiosClient.get(url);
  },
};
export default groupApi;
