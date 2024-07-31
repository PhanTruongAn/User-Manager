import { Route, Routes } from "react-router-dom";
import AdminHome from "../components/Admin/AdminHome";
import UserManager from "../components/Admin/UserManager";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import UserHome from "../components/User/UserHome";
import Role from "../components/Role/Role";
import Project from "../components/Project/Project";
import Message from "../components/Message/Message";
import { path } from "../utils/constant";
// import ErrorPage from "./ErrorPage";
import PrivateRoute from "./PrivateRoute";
const AppRoute = () => {
  return (
    <>
      <Routes>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.REGISTER} element={<Register />} />
        <Route
          path={path.ADMIN_HOME}
          //   errorElement={<ErrorPage />}
          element={<PrivateRoute component={<AdminHome />} />}
        >
          <Route
            path="users"
            element={<PrivateRoute component={<UserManager />} />}
          />
          <Route path="roles" element={<PrivateRoute component={<Role />} />} />
          <Route
            path="messages"
            element={<PrivateRoute component={<Message />} />}
          />
          <Route
            path="projects"
            element={<PrivateRoute component={<Project />} />}
          />
        </Route>
        <Route path={path.HOME} element={<UserHome />} />
      </Routes>
    </>
  );
};
export default AppRoute;
