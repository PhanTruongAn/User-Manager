import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "./AdminHome.scss";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import items from "./ItemsMenu";
const { Header, Sider, Content } = Layout;
const AdminHome = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userInit.user);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  const handlePath = ({ key }) => {
    navigate(key);
  };
  return (
    <Layout className="container-fluid p-0 admin-container">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          className="menu"
          onClick={(key) => handlePath(key)}
          theme="light"
          mode="inline"
          defaultSelectedKeys={
            window.location.pathname ? window.location.pathname : "/admin-home"
          }
          selectedKeys={window.location.pathname.split("/admin-home/")[1]}
          defaultOpenKeys={"/admin-home"}
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
            <Button
              className="btn-logOut"
              type="text"
              size="large"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
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
