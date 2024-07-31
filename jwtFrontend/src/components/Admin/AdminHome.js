import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ExclamationCircleOutlined,
  MoonOutlined,
  SunOutlined,
} from "@ant-design/icons";

import "./AdminHome.scss";
import { Button, Layout, Menu, theme, Modal } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import items from "./ItemsMenu";
import userApi from "../../api/userApi";
import { toast } from "react-toastify";
const { Header, Sider, Content } = Layout;
const AdminHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInit.user);
  const [themes, setThemes] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [modal, contextHolder] = Modal.useModal();
  const confirm = () => {
    modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined />,
      content: "Are you sure to want logout?",
      okText: "Ok",
      cancelText: "Cancel",
      onOk: () => handleLogout(),
    });
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogout = async () => {
    const res = await userApi.userLogOut();
    if (res && res.EC === 0) {
      localStorage.removeItem("jwt");
      navigate("/login");
      toast.success(res.message, { autoClose: 1000 });
    } else {
      toast.error(res.EM, { autoClose: 1000 });
    }
  };
  const handlePath = ({ key }) => {
    if (key === "log-out") {
      confirm();
    } else {
      navigate(key);
    }
  };
  const className = themes ? "btn-logOut light-theme" : "btn-logOut dark-theme";
  const changeTheme = () => {
    setThemes(!themes);
  };

  return (
    <Layout className="container-fluid p-0 admin-container">
      {contextHolder}
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="demo-logo-vertical" />
        <Menu
          className="menu"
          onClick={(key) => handlePath(key)}
          theme="light"
          mode="inline"
          defaultSelectedKeys={
            window.location.pathname ? window.location.pathname : "/admin-home"
          }
          selectedKeys={
            window.location.pathname.split("/admin-home/")[1]
              ? window.location.pathname.split("/admin-home/")[1]
              : window.location.pathname
          }
          defaultOpenKeys={["/admin-home"]}
          items={items}
        />
      </Sider>
      <Layout className="container-fluid p-0">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            className="collapsed-button"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />

          <div className="header-content">
            Welcome, {user.username}
            {/* <Button
                className="btn-changeTheme"
                size="middle"
                icon={<MoonOutlined />}
                theme="dark"
              ></Button> */}
            <Button
              className={className}
              size="large"
              icon={themes ? <MoonOutlined /> : <SunOutlined />}
              onClick={changeTheme}
            />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminHome;
