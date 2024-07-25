import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUserToken } from "../redux/userSlice";
const PrivateRoute = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const reduxData = useSelector((state) => state.userInit); // Kiểm tra user
  const token = localStorage.getItem("access_token");
  console.log(token);
  useEffect(() => {
    if (!token) {
      // Nếu không có token, điều hướng đến /login
      navigate("/login");
    } else if (!reduxData.isAuthenticated) {
      // Nếu có token nhưng chưa xác thực, dispatch action
      dispatch(fetchUserToken({ token }));
    }
  }, [dispatch, navigate, token, reduxData.isAuthenticated]);

  if (reduxData.user || reduxData.isAuthenticated === true) {
    return props.component;
  }
};

export default PrivateRoute;
