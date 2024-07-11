import { Outlet } from "react-router-dom";
import Header from "../components/Header/Header";
const System = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
export default System;
