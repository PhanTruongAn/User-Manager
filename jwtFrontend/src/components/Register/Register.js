import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Register.scss";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import userApi from "../../api/userApi";
const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessenger, setErrorMessenger] = useState("");
  let handlerShowPassword = () => {
    setShowPassword(!showPassword);
  };
  let handlerShowReEnterPassword = () => {
    setShowReEnterPassword(!showReEnterPassword);
  };
  let handleLogin = () => {
    navigate("/login");
  };
  let handleRegister = async () => {
    let data = {
      username: userName,
      email: email,
      phone: phone,
      password: password,
    };
    if (confirmPassword === password) {
      let res = await userApi.userRegister(data);
      if (res && res.EC === 0) {
        toast.success("Register success!", {
          autoClose: 1000,
        });
        setEmail("");
        setUserName("");
        setPhone("");
        setPassword("");
        setConfirmPassword("");
        setErrorMessenger("");
      } else if (res.EC === 2) {
        toast.error(res.EM);
      } else {
        setErrorMessenger(res.EM);
      }
    } else {
      setErrorMessenger("Re-enter password isn't correct!");
    }
  };
  return (
    <div className="container-fluid login-wrapper d-flex justify-content-center py-3 align-items-sm-center register-wrapper">
      <div className="register-container bg-white">
        <div className="register-content">
          <div className="col-12 text-register">Register</div>
          <div className="col-12 form-group register-input">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your username"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            />
          </div>
          <div className="col-12 form-group register-input">
            <label>Email</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="col-12 form-group register-input">
            <label>Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
              onChange={(e) => {
                setPhone(e.target.value);
              }}
              value={phone}
            />
          </div>
          <div className="col-12 form-group register-input">
            <label>Password</label>
            <div className="custom-password">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
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
          <div className="col-12 form-group register-input">
            <label>Re-enter password</label>
            <div className="custom-password">
              <input
                type={showReEnterPassword ? "text" : "password"}
                className="form-control"
                placeholder="Re-enter your password"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleRegister();
                  }
                }}
                value={confirmPassword}
              />
              <FontAwesomeIcon
                icon={
                  showReEnterPassword
                    ? "fa-solid fa-eye"
                    : "fa-solid fa-eye-slash"
                }
                className="eye-icon"
                onClick={handlerShowReEnterPassword}
              />
            </div>
          </div>
          <div
            className="col-12"
            style={{ fontSize: 13, color: "red", marginLeft: 8 }}
          >
            <strong>{errorMessenger}</strong>
          </div>

          <div className="col-12">
            <button
              type="button"
              className="btn-register text-light"
              onClick={handleRegister}
            >
              Register
            </button>
          </div>
          <div className="col-12">
            <button className="btn-login" onClick={handleLogin}>
              Already have an account? <strong>Login</strong>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
