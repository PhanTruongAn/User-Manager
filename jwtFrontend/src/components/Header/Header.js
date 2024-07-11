import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Header.scss";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="header-container">
      {/* <div className="header-tabs-container"></div> */}
      <Dropdown>
        <Dropdown.Toggle className="header-menu">Hệ thống</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <Link to="user-manager" className="link-item">
              Danh sách người dùng
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link to="admin-manager" className="link-item">
              Lịch hẹn bệnh nhân
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <div className="btn-logout">
        <FontAwesomeIcon icon="fa-solid fa-arrow-right-from-bracket" />
      </div>
    </div>
  );
}

export default Header;
