import axiosClient from "./axiosClient";
const baseUrl = "/user/";
const userApi = {
  userLogin: (userData) => {
    return axiosClient.post("/login", userData);
  },
  userRegister: (userData) => {
    return axiosClient.post("/register", userData);
  },
  getUsers: (page, limit) => {
    return axiosClient.get(`${baseUrl}get-all?page=${page}&limit=${limit}`);
  },
  fetchToken: (data) => {
    return axiosClient.post("/fetch-token", data);
  },
  updateUser: (data) => {
    return axiosClient.put(baseUrl + "update", data);
  },
  deleteUser: (data) => {
    return axiosClient.delete(`${baseUrl}delete`, { data });
  },
  createUser: (data) => {
    return axiosClient.post(`${baseUrl}create`, data);
  },
};
export default userApi;
