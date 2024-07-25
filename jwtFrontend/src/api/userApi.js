import axiosClient from "./axiosClient";
const baseUrl = "/user/";
const userApi = {
  userLogin: (userData) => {
    return axiosClient.post(baseUrl + "login", userData);
  },
  userRegister: (userData) => {
    return axiosClient.post(baseUrl + "register", userData);
  },
  getUsers: (page, limit) => {
    return axiosClient.get(`${baseUrl}get-all?page=${page}&limit=${limit}`);
  },
  fetchToken: (data) => {
    return axiosClient.post(baseUrl + "fetch-token", data);
  },
  updateUser: (data) => {
    return axiosClient.put(baseUrl + "update", data);
  },
  deleteUser: (id) => {
    return axiosClient.delete(`${baseUrl}delete/${id}`);
  },
  createUser: (data) => {
    return axiosClient.post(`${baseUrl}create`, data);
  },
};
export default userApi;
