// import logo from "./logo.svg";
// import "./App.css";
import Login from "./components/Login/Login";
import { ToastContainer } from "react-toastify";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Fragment } from "react";
import UserManager from "./containers/System/User/UserManager";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home";
import ErrorPage from "./routes/ErrorPage";
import System from "./routes/System";
import AdminManager from "./containers/System/User/AdminManager";
import Register from "./components/Register/Register";
import { path } from "./utils/constant";
function App() {
  const router = createBrowserRouter([
    {
      path: path.LOGIN,
      element: <Login />,
    },
    {
      path: path.HOME,
      element: <Home />,
      errorElement: <ErrorPage />,
    },
    {
      path: path.REGISTER,
      element: <Register />,
    },
    {
      path: path.SYSTEM,
      element: <System />,
      children: [
        {
          path: "user-manager",
          element: <UserManager />,
        },
        {
          path: "admin-manager",
          element: <AdminManager />,
        },
      ],
    },
  ]);
  return (
    <Fragment>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer />
      </Provider>
    </Fragment>
  );
}

export default App;
