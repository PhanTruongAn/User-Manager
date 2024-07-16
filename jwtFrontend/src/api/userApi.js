import axiosClient from "./axiosClient";
const userApi = {
  userLogin: (userData) => {
    let url = "/user/login";
    return axiosClient.post(url, userData);
  },
  userRegister: (userData) => {
    let url = "/user/register";
    return axiosClient.post(url, userData);
  },
  getUsers: () => {
    let url = "/user/get-all";
    return axiosClient.get(url);
  },
};
export default userApi;
