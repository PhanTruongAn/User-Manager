import React, { useState } from "react";
import "./Login.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessenger, setErrorMessenger] = useState("");
  let handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };

  let handlerUseNameChange = (e) => {
    setUsername(e.target.value);
  };
  let handlerPasswordChange = (e) => {
    setPassword(e.target.value);
  };
  let handlerLogin = async () => {
    try {
      let userData = {
        userName: username,
        password: password,
      };
      let res = await userApi.userLogin(userData);
      if (res && res.EC === 0) {
        dispatch(loginSuccess(res.DT));
        localStorage.setItem("access_token", res.access_token);
        toast.success("Login Success!", { autoClose: 1000 });
        setUsername("");
        setPassword("");
        setErrorMessenger("");
        navigate("/");
      } else {
        setErrorMessenger(res.EM);
      }
    } catch (error) {
      toast.error("Error from server!");
      console.log(error);
    }
  };
  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-content row">
          <div className="col-12 text-login">Login</div>
          <div className="col-12 form-group login-input">
            <label>Username/Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your Username or Email"
              value={username}
              onChange={(e) => handlerUseNameChange(e)}
            />
          </div>
          <div className="col-12 form-group login-input">
            <label>Password</label>
            <div className="custom-password">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlerPasswordChange(e)}
              />
              <FontAwesomeIcon
                icon={
                  showPassword ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"
                }
                className="eye-icon"
                onClick={handlerShowPassword}
              />
            </div>
          </div>
          <div className="col-12" style={{ fontSize: 13, color: "red" }}>
            {errorMessenger}
          </div>
          <div className="col-12">
            <button type="button" className="btn-login" onClick={handlerLogin}>
              Login
            </button>
          </div>
          <div className="col-12">
            <button className="forgot-password">Forgot your password?</button>
          </div>
          <div className="col-12 text-center">
            <span>Or Login with:</span>
          </div>
          <div className="col-12 d-flex justify-content-around social-icon">
            <button type="button" className="google">
              <FontAwesomeIcon
                icon="fa-brands fa-google-plus-g"
                fontSize={23}
                color="white"
              />
            </button>
            <button type="button" className="facebook">
              <FontAwesomeIcon
                icon="fa-brands fa-facebook-f"
                fontSize={23}
                color="white"
              />
            </button>
            <button type="button" className="twitter">
              <FontAwesomeIcon
                icon="fa-brands fa-twitter"
                style={{
                  fontSize: 23,
                  color: "white",
                }}
              />
            </button>
          </div>
        </div>
      </div>

      <div
        className="login-button"
        // onClick={toggleLoginForm}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          backgroundColor: "#0dcaf0",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Login
      </div>
    </div>
  );
}
export default Login;
